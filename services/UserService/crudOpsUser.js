import { User } from "./index";
import { db } from "../Firebase/firebaseConfig";

export const addUserToFirestore = async (user) => {
    if (!(user instanceof User)) {
        throw new Error('Expected argument of type "User"');
    }

    try {
        // As Firebase generates the ID, we don't specify a .doc() argument
        const userRef = db.collection('users').doc();

        // Set the user data
        await userRef.set({
            userId:user.userId, 
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

export const getByUserId = async (userId) => {
    try {
        const userRef = db.collection('users').doc(userId);
        const doc = await userRef.get();

        if (!doc.exists) {
            console.log("User with given ID doesn't exist.");
            return null;
        } else {
            return doc.data();
        }

    } catch (error) {
        console.error("Error retrieving user: ", error);
        return null;
    }
};