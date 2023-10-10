import Firestore from '@react-native-firebase/firestore';

export const getMessages = (chatId, setMessages) => {
  return Firestore()
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) => {
      const messages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: data.user,
          image: data.image,
        };
      });
      setMessages(messages);
    });
};

export const sendMessage = (chatId, message) => {
  return Firestore()
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add({
      ...message,
      createdAt: Firestore.Timestamp.fromDate(message.createdAt),
    });
};
