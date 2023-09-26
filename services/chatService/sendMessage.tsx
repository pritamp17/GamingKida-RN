import { db } from './firebase/firebaseConfig';
import firebase from './firebase/firebase/app';

export const sendMessage = async (messageContent, senderId, chatId) => {
  try {
    // Add a new message document to the specified 'chatId' collection
    await db.collection('chats').doc(chatId).collection('messages').add({
      content: messageContent,
      senderId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};