import { db } from '../firebase/firebaseconfig';
import { Org, orgExists, isUserAdmin } from './helpers'


export const createOrg = async (org, userId) => {
    try {
        if (!(org instanceof Org)) throw new Error('Expected argument of type "Org"');

        if (await orgExists(org.name)) {
            console.error('Organization name is already taken!');
            return false;
        }

        org.adminIds.push(userId);
        org.memberIds.push(userId);

        const docRef = await db.collection('org').add({
            name: org.name,
            createdAt: org.createdAt,
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

        if (!await isUserAdmin(userId, orgData)) {
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


