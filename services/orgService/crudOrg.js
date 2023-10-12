import { db } from '../firebase/firebaseconfig';
import { Org, orgExists, isUserAdmin, isUserSuperAdmin } from './helpers'


export const createOrg = async (org, userId) => {
    try {
        if (!(org instanceof Org)) throw new Error('Expected argument of type "Org"');

        if (await orgExists(org.name)) {
            console.error('Organization name is already taken!');
            return false;
        }

        org.superAdmin = userId;
        org.adminIds.push(userId);
        org.memberIds.push(userId);

        const docRef = await db.collection('org').add({
            name: org.name,
            createdAt: org.createdAt,
            superAdmin:org.superAdmin,
            adminIds: org.adminIds,
            memberIds: org.memberIds,
            competitionIds: org.competitionIds
        });

        console.log('Organization successfully created with ID: ', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error creating organization: ', error);
        return false;
    }
};

export const searchOrg = async (name) => {
    return await orgExists(name);
};

export const deleteOrg = async (name, userId) => {
    try {
        const orgData = await orgExists(name);
        if (!orgData) {
            console.error(`No organization found with the name "${name}"!`);
            return false;
        }

        if (!await isUserSuperAdmin(userId, orgData)) {
            console.error("Error: User is not an admin of this organization and cannot delete it.");
            return false;
        }

        await db.collection('org').doc(orgData.id).delete();
        console.log(`Organization with name "${name}" has been deleted.`);
        return true;
    } catch (error) {
        console.error('Error deleting organization: ', error);
        return false;
    }
};

export const renameOrg = async (userId, oldName, newName) => {
    try {
        const oldOrgData = await orgExists(oldName);
        if (!oldOrgData) {
            console.error(`No organization found with the name "${oldName}"!`);
            return false;
        }

        if (!await isUserAdmin(userId, oldOrgData)) {
            console.error("Error: User is not an admin of this organization and cannot rename it.");
            return false;
        }

        if (await orgExists(newName)) {
            console.error(`Organization with the name "${newName}" already exists!`);
            return false;
        }

        await db.collection('org').doc(oldOrgData.id).update({ name: newName });
        console.log(`Organization "${oldName}" has been renamed to "${newName}"`);
        return true;
    } catch (error) {
        console.error('Error renaming organization: ', error);
        return false;
    }
};

export const removeMember = async (orgName, memberId, adminId) => {
    try {
        // Check if the organization exists
        const orgData = await orgExists(orgName);
        if (!orgData) {
            console.error(`No organization found with the name "${orgName}"!`);
            return false;
        }

        // Check if the adminId is an admin of the organization
        if (!await isUserAdmin(adminId, orgData)) {
            console.error("Error: User is not an admin of this organization and cannot remove members.");
            return false;
        }

        // Check if the memberId exists in the organization
        if (!orgData.memberIds.includes(memberId)) {
            console.error(`No member found with the ID "${memberId}" in the organization "${orgName}"!`);
            return false;
        }

        // Remove the memberId from memberIds
        const updatedMemberIds = orgData.memberIds.filter(id => id !== memberId);

        // Update the memberIds in the Firestore document
        await db.collection('org').doc(orgData.id).update({ memberIds: updatedMemberIds });

        console.log(`Member with ID "${memberId}" has been removed from the organization "${orgName}"`);
        return true;
    } catch (error) {
        console.error('Error removing member from organization: ', error);
        return false;
    }
};

export const makeUserAdmin = async (superAdminId, userId, orgName) => {
    try {
        // Check if organization exists.
        const orgData = await orgExists(orgName);
        if (!orgData) return false;

        // Check if superAdminId is super admin of the organization.
        if (!await isUserSuperAdmin(superAdminId, orgData)) {
            console.error("Error: User is not a super admin of this organization and cannot make other users admin.");
            return false;
        }

        // Check if userId is a member of the organization.
        if (!orgData.memberIds.includes(userId)) {
            console.error("Error: User is not a member of this organization.");
            return false;
        }

        // Make the user an admin by adding to adminIds if not already an admin.
        if (!orgData.adminIds.includes(userId)) {
            await db.collection('org').doc(orgData.id).update({
                adminIds: [...orgData.adminIds, userId]
            });
            console.log(`User with ID: "${userId}" is now an admin of the organization "${orgName}".`);
        } else {
            console.log(`User with ID: "${userId}" is already an admin of the organization "${orgName}".`);
        }

        return true;
    } catch (error) {
        console.error('Error making user admin: ', error);
        return false;
    }
};

export const removeAdmin = async (orgName, superAdminId, adminId) => {
    try {
        // Check if organization exists.
        const orgData = await orgExists(orgName);
        if (!orgData) return false;

        // Check if superAdminId is super admin of the organization.
        if (!await isUserSuperAdmin(superAdminId, orgData)) {
            console.error("Error: User is not a super admin of this organization and cannot remove admins.");
            return false;
        }

        // Check if adminId is an admin of the organization.
        if (!orgData.adminIds.includes(adminId)) {
            console.error("Error: User is not an admin of this organization.");
            return false;
        }

        // Remove the user from the admin by filtering out the adminId.
        const newAdminIds = orgData.adminIds.filter(id => id !== adminId);

        // Update the database.
        await db.collection('org').doc(orgData.id).update({
            adminIds: newAdminIds
        });

        console.log(`User with ID: "${adminId}" has been removed from the admins of the organization "${orgName}".`);
        return true;
    } catch (error) {
        console.error('Error removing admin: ', error);
        return false;
    }
};










