import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { db } from './firebaseConfig'; // import your firebase configurations
import firebase from 'firebase/app';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const user = firebase.auth().currentUser;

  useEffect(() => {
    // Subscribe to message updates from Firebase
    const unsubscribe = db.collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        }));
        setMessages(newMessages);
      });

    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, []);

  const onSend = async (newMessages = []) => {
    const message = newMessages[0];
    // Add new message to Firebase
    await db.collection('messages').add({
      ...message,
      user: {
        _id: user.uid,
        name: user.displayName,
      },
      createdAt: firebase.firestore.Timestamp.fromDate(message.createdAt),
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: user.uid,
      }}
    />
  );
};

export default ChatScreen;
