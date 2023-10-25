import UPIPayment from 'react-native-upi-payment';
import { savePaymentToAsyncStorage } from './index';
import { addTransxIdToTournamnet } from '../TournamentService/index';

export const sendPayment = async (vpa, name, amount, type, transactionRef, tournamentId, userId) => {
    const successCallbackWithData = (data) => {
        console.log("Success", data);
        savePaymentToAsyncStorage(userId, tournamentId, data.Status, data.txnId, transactionRef, amount, type);
        addTransxIdToTournamnet(tournamentId, data.txnId, data.txnRef);
    };

    const failureCallbackWithData = (data) => {
        console.log("Failed", data);
        savePaymentToAsyncStorage(userId, tournamentId, data.Status, data.txnId ? data.txnId : null, transactionRef , amount, type);
    };

    UPIPayment.initializePayment({
        vpa: vpa,
        payeeName: name,
        amount: amount.toString(),
        transactionNote: type,
        transactionRef: transactionRef
    }, successCallbackWithData, failureCallbackWithData);
}
