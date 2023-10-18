import { addUserToFirestore, getByUserId } from "./crudOpsUser";

export class User {
    constructor(userId, name, email, groupIds = [], competitionIds = [], connectionIds = []) {
        this.userId = userId;   /// we get it from google signIn
        this.name = name;
        this.email = email;
        this.groupIds = groupIds;
        this.competitionIds = competitionIds;
        this.connectionIds = connectionIds;
    }
}

export {
    User,
    addUserToFirestore,
    getByUserId
}