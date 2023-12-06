import { addTransxIdToTournamnet } from '../TournamentService/index';
import { savePaymentToFirebase } from '../PayService/index'
export class Payment {
    constructor(userId, name, success, transactionId, transactionRef, amount, type, orgId, tournamentId) {
        this.userId = userId;
        this.name = name;
        this.success = success;
        this.transactionId = transactionId;
        this.transactionRef = transactionRef;
        this.amount = amount;
        this.type = type;
        this.orgId = orgId;  //// oergId = userId when individual user
        this.tournamentId = tournamentId;
    }
}

// payement types {make enums later}
const COMPETETION_JOIN_SUCCESS = "payment success for competetion"

export const handleCompetetionJoinSucces = async(userId, txnId, transactionRef, amount, orgId, tournamentId, name) => {
    try {
       const payementId =  savePaymentToFirebase(userId, txnId, transactionRef, amount, COMPETETION_JOIN_SUCCESS, orgId, name, tournamentId);
       console.info(`"${payementId}" created`)
    } catch (error) {
        console.error(`error saving payement with "${userId}" in firebase`)
    }
   
    try {
       success,_ =  addTransxIdToTournamnet(tournamentId, txnId, transactionRef);
       console.info(` "${txnId}" successfull addedin "${tournamentId}"`)
    } catch (error) {
        console.error(`failed adding "${txnId}" in "${tournamentId}"`)
    }
   
}