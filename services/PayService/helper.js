export class Payment {
    constructor(userId, name, success, transactionId, amount, verified, type) {
        this.userId = userId;
        this.name = name;
        this.success = success;
        this.transactionId = transactionId;
        this.amount = amount;
        this.verified = verified;
        this.type = type;
    }
}