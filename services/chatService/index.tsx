import Firestore from '@react-native-firebase/firestore';
import { IMessage } from './IMessage';

export const getMessages = (chatId: string, setMessages: (messages: IMessage[]) => void) => {
  return Firestore()
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) => {
      const messages: IMessage[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: data.user,
          image: data.image,
        } as IMessage;
      });
      setMessages(messages);
    });
};

export const sendMessage = (chatId: string, message: IMessage) => {
  return Firestore()
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add({
      ...message,
      createdAt: Firestore.Timestamp.fromDate(message.createdAt),
    });
};
