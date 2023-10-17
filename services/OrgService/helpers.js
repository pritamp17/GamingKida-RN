import { db } from '../Firebase/firebaseconfig';

// Class Definition
class Org {
    constructor(name, createdAt, superAdmin,adminIds = [], memberIds = [], competitionIds = []) {
        this.name = name;
        this.createdAt = createdAt;
        this.superAdmin = superAdmin
        this.adminIds = adminIds;
        this.memberIds = memberIds;
        this.competitionIds = competitionIds;
    }
}

const orgExists = async (name) => {
    try {
        const querySnapshot = await db.collection('orgs').where('name', '==', name).get();
        if (querySnapshot.empty) return null;
        const orgDoc = querySnapshot.docs[0];
        return { id: orgDoc.id, ...orgDoc.data() };
    } catch (error) {
        console.error('Error checking organization existence: ', error);
        return null;
    }
};

const orgById = async (id) => {
    try {
        const orgDoc = await db.collection('orgs').doc(id).get();
        if (!orgDoc.exists) return null;
        return { id: orgDoc.id, ...orgDoc.data() };
    } catch (error) {
        console.error('Error retrieving tournament: ', error);
        return null;
    }
}

const isUserAdmin = async (userId, orgData) => {
    return orgData.adminIds.includes(userId);
};

const isUserSuperAdmin = async (userId, orgData) => {
    return orgData.superAdmin === userId;
};

export { Org, orgExists, isUserAdmin, isUserSuperAdmin, orgById};