export class User {
  constructor(id, name, email, groupIds = [], competitionIds = [], connectionIds = []) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.groupIds = groupIds;
      this.competitionIds = competitionIds;
      this.connectionIds = connectionIds;
  }
}

export const addUserToFirestore = async (user) => {
  if (!(user instanceof User)) {
      throw new Error('Expected argument of type "User"');
  }

  try {
      const userRef = Firestore().collection('users').doc(user.id);
      const doc = await userRef.get();

      // Check if user exists, if not add them to Firestore
      if (!doc.exists) {
          await userRef.set({
              name: user.name,
              email: user.email,
              groupIds: user.groupId,
              competitionIds: user.competitionId,
              connectionIds: user.connectionId,
              // ... other fields
          });
          console.log("User added successfully!");
          return true;
      } else {
          console.log("User already exists!");
          return false;
      }
  } catch (error) {
      console.error("Error adding user: ", error);
      return false;
  }
};
