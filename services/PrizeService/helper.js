export class Prize {
    constructor(userId, orgId, competeId, type, transactionId, amount, isCompleted, date) {
        this.userId = userId;
        this.orgId = orgId;
        this.competeId = competeId;
        this.type = type;
        this.transactionId = transactionId;
        this.amount = amount;
        this.isCompleted = isCompleted;
        this.date = date;
    }
}