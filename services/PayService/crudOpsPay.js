import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../Firebase/firebaseConfig';

export const savePaymentToAsyncStorage = async (userId, tournamentId, status, transactionId, transactionRef, amount, type) => {
    try {
        const paymentInfo = {
            userId: userId,
            status: status, 
            transactionId: transactionId,
            transactionRef: transactionRef,
            amount: amount,
            type: type,
            date: new Date().toISOString().split('T')[0]   // format: YYYY-MM-DD
        };

          // Convert the payment info to a string to store in AsyncStorage
          const paymentString = JSON.stringify(paymentInfo);

  
          // Set the payment data in AsyncStorage with a dynamic key including the current date
          const key = `pay/tournament/${tournamentId}`;
          await AsyncStorage.setItem(key, paymentString);
  
          console.log("Payment added successfully to AsyncStorage!");
          return { success: true };

    } catch (error) {
        console.error("Error adding payment to AsyncStorage: ", error);
        return { success: false, error: error.message };
    }
};


export const getTournamentPayInfo = async (tournamentId) => {
    try {
        // Get the key for the specific tournament
        const key = `pay/tournament/${tournamentId}`;

        // Fetch the payment data from AsyncStorage using the key
        const paymentString = await AsyncStorage.getItem(key);

        // If no data is found, return null or any appropriate default value
        if (!paymentString) {
            return null;
        }

        // Convert the string back to a JavaScript object
        const paymentInfo = JSON.parse(paymentString);

        return paymentInfo;

    } catch (error) {
        console.error("Error fetching payment info from AsyncStorage: ", error);
        throw error;
    }
};


export const savePaymentToFirebase = async (userId, txnId, transactionRef, amount, type, orgId, name,tournamentId) => {
    try {
        // Check if the payment collection for the organization exists
        const orgDocRef = db.collection('payment').doc(orgId);
        const orgDoc = await orgDocRef.get();

        if (!orgDoc.exists) {
            // If the organization document doesn't exist, create it
            await orgDocRef.set({});
        }

        // Now, add the payment document to the organization's payments collection
        const paymentRef = await orgDocRef.collection('payments').add({
            userId,
            txnId,
            transactionRef,
            amount,
            type,
            orgId,
            success: true, // You may adjust this based on your payment success logic
            name: name, // Replace with the actual logic to get the name
            tournamentId:tournamentId
        });

        console.log('Payment completed successfully created with ID: ', paymentRef.id);
        return paymentRef.id;
    } catch (error) {
        console.error('Error making payment: ', error);
        return null;
    }
}