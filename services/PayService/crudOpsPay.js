import { db } from '../Firebase/firebaseconfig';

export const savePaymentToFirebase = async (userId, name, success, transactionId, amount, verified, type) => {
    try {
        // As Firebase generates the ID, we don't specify a .doc() argument
        const paymentRef = db.collection('payments').doc();

        // Set the payment data
        await paymentRef.set({
            userId: userId,
            name: name,
            success: success,
            transactionId: transactionId,
            amount: amount,
            verified: verified,
            type: type
        });

        console.log("Payment added successfully!");
        return { success: true, paymentId: paymentRef.id };

    } catch (error) {
        console.error("Error adding payment: ", error);
        return { success: false, error: error.message };
    }
};