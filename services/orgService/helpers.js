import { db } from '../firebase/firebaseconfig';

// Class Definition
class Org {
    constructor(name, createdAt, adminIds = [], memberIds = [], competitionIds = []) {
        this.name = name;
        this.createdAt = createdAt;
        this.adminIds = adminIds;
        this.memberIds = memberIds;
        this.competitionIds = competitionIds;
    }
}

const orgExists = async (name) => {
    try {
        const querySnapshot = await db.collection('org').where('name', '==', name).get();
        if (querySnapshot.empty) return null;

        const orgDoc = querySnapshot.docs[0];
        return { id: orgDoc.id, ...orgDoc.data() };
    } catch (error) {
        console.error('Error checking organization existence: ', error);
        return null;
    }
};

const isUserAdmin = async (userId, orgData) => {
    return orgData.adminIds.includes(userId);
};

export { Org, orgExists, isUserAdmin};