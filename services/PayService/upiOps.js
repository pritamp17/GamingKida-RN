import UPIPayment from 'react-native-upi-payment';
import { Payment, savePaymentToAsyncStorage } from './index';
import {addTransxIdToTournamnet} from '../TournamentService/index'

export const sendPayment = async (vpa, name, amount, type, transactionRef, tournamentId, userId) => {
    UPIPayment.initializePayment({
        vpa:  vpa,//'test@upi',  // The VPA address of the payee. Replace with your VPA or the VPA you want to make a payment to.
        payeeName: name,
        amount: amount.toString(),
        transactionNote: type,
        transactionRef: transactionRef
    }, successCallback, failureCallback);
}

const successCallback = (data) => {
    console.log("Success", data);
    savePaymentToAsyncStorage(userId, tournamentId, "Success", data.txnId, data.txnRef, amount, paymentDetails.type);
    addTransxIdToTournamnet(tournamentId,data.txnId, data.txnRef);
}

const failureCallback = (data) => {
    console.log("Failed", data);
    savePaymentToAsyncStorage(userId, tournamentId, "Failed", data.txnId, data.txnRef, amount, paymentDetails.type);
}