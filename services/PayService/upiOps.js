import UPIPayment from 'react-native-upi-payment';
import { Payment } from './index';

export const sendPayment = async (paymentDetails) => {
    if (!(paymentDetails instanceof Payment)) {
        throw new Error('Expected argument of type "Payment"');
    }

    UPIPayment.initializePayment({
        vpa: 'test@upi',  // The VPA address of the payee. Replace with your VPA or the VPA you want to make a payment to.
        payeeName: paymentDetails.name,
        amount: paymentDetails.amount.toString(),
        transactionNote: 'Payment for ' + paymentDetails.type,
        transactionRef: paymentDetails.transactionId
    }, successCallback, failureCallback);
}

const successCallback = (data) => {
    console.log("Success", data);

}

const failureCallback = (data) => {
    console.log("Failed", data);
    // Handle the failed transaction logic here
}