import { db } from '../Firebase/firebaseconfig';

export class User {
    constructor(name, email, groupIds = [], competitionIds = [], connectionIds = []) {
        this.name = name;
        this.email = email;
        this.groupIds = groupIds;
        this.competitionIds = [];
        this.connectionIds = [];
    }
}

export const addUserToFirestore = async (user) => {
    if (!(user instanceof User)) {
        throw new Error('Expected argument of type "User"');
    }

    try {
        // As Firebase generates the ID, we don't specify a .doc() argument
        const userRef = db.collection('users').doc();

        // Set the user data
        await userRef.set({
            name: user.name,
            email: user.email,
            groupIds: user.groupIds,
            competitionIds: user.competitionIds,
            connectionIds: user.connectionIds,
            // ... other fields
        });

        console.log("User added successfully!");
        return true;

    } catch (error) {
        console.error("Error adding user: ", error);
        return false;
    }
};
