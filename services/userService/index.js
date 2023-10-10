import Firestore from '@react-native-firebase/firestore';

export const addUserToFirestore = async (user) => {
  try {
    const userRef = Firestore().collection('users').doc(user.id);
    const doc = await userRef.get();
    
    // Check if user exists, if not add them to Firestore
    if (!doc.exists) {
      await userRef.set({
        name: user.name,
        email: user.email,
        groupId: [],
        competitionId: [],
        connectionId: [],
        // ... other fields
      });
    }
    return true;
  } catch (error) {
    console.error("Error adding user: ", error);
    return false;
  }
};
