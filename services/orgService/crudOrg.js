import { db } from '../firebase/firebaseconfig';

class Org {
    constructor(name, createdAt, adminIds, memberIds, competitionIds) {
        this.name = name;
        this.createdAt = createdAt;
        this.adminIds = adminIds;
        this.memberIds = memberIds;
        this.competitionIds = competitionIds;
    }
}

export const createOrg = async (org, userId) => {
    // Validate org
    if (!(org instanceof Org)) {
        throw new Error('Expected argument of type "Org"');
    }

    // Reference to the Firestore collection
    const orgCollection = db.collection('org');

    // Check if the organization name is already taken
    const nameCheck = await orgCollection.where('name', '==', org.name).get();
    
    if (!nameCheck.empty) {
        console.error('Organization name is already taken!');
        return false;
    }

    // Add userId to adminIds and memberIds
    org.adminIds.push(userId);
    org.memberIds.push(userId);

    // Add the new org into Firestore and auto-generate an ID
    return orgCollection.add({
        name: org.name,
        createdAt: org.createdAt,
        adminIds: org.adminIds,
        memberIds: org.memberIds,
        competitionIds: org.competitionIds
    })
    .then((docRef) => {
        console.log('Organization successfully created with ID: ', docRef.id);
        return docRef.id; // Return the ID of the newly created doc
    })
    .catch((error) => {
        console.error('Error creating organization: ', error);
        return false;
    });
};

export const searchOrg = async (name) => {
    try {
        // Reference to the Firestore collection
        const orgCollection = db.collection('org');

        // Search for the organization by name
        const querySnapshot = await orgCollection.where('name', '==', name).get();

        // Check if any documents are found
        if (!querySnapshot.empty) {
            // Get the first document (there should only be one due to name uniqueness)
            const orgDoc = querySnapshot.docs[0];

            // Return the organization data as an object
            return {
                id: orgDoc.id,
                ...orgDoc.data()
            };
        } else {
            console.error('No organization found with the provided name!');
            return null;
        }
    } catch (error) {
        console.error('Error searching for organization: ', error);
        return null;
    }
};

export const deleteOrg = async (name, userId) => {
    try {
        // Reference to the Firestore collection
        const orgCollection = db.collection('org');

        // Search for the organization by name
        const querySnapshot = await orgCollection.where('name', '==', name).get();

        // Check if any documents are found
        if (!querySnapshot.empty) {
            // Get the first document (there should only be one due to name uniqueness)
            const orgDoc = querySnapshot.docs[0];
            
            // Check if the userId is in the adminIds array
            const orgData = orgDoc.data();
            if (orgData.adminIds.includes(userId)) {
                // Delete the organization
                await orgCollection.doc(orgDoc.id).delete();
                console.log(`Organization with name "${name}" has been deleted.`);
                return true;
            } else {
                console.error("Error: User is not an admin of this organization and cannot delete it.");
                return false;
            }
        } else {
            console.error(`No organization found with the name "${name}"!`);
            return false;
        }
    } catch (error) {
        console.error('Error deleting organization: ', error);
        return false;
    }
};


export { Org };
