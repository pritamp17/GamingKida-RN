import UPIPayment from 'react-native-upi-payment';
import {handleCompetetionJoinSucces} from './helper'

// orgId = userId if competetion created by indvidual user
export const sendPayment = async (vpa, name, amount, type, transactionRef, tournamentId, userId, orgId) => {
    const successCallbackWithData = (data) => {
        console.log("Success", data);
        handleCompetetionJoinSucces(userId, data.txnId, transactionRef, amount, orgId, tournamentId, name)
    };

    const failureCallbackWithData = (data) => {
        console.log("Failed", data);
    };

    UPIPayment.initializePayment({
        vpa: vpa,
        payeeName: name,
        amount: amount.toString(), 
        transactionNote: type,
        transactionRef: transactionRef
    }, successCallbackWithData, failureCallbackWithData);
}
