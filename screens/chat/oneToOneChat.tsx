import React, { useState, useEffect } from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { getMessages, sendMessage } from '../../services/chatService/index';
import { IMessage, User } from '../../commons/interface/giftedChat';

const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const chatId = "your_chat_id"; // Replace with the actual chat ID

  // Assuming redux state structure: state.auth.user
  const reduxUser = useSelector((state: any) => state.auth.user);
  const user: User = {
    _id: reduxUser.id,
    name: reduxUser.name,
    avatar: reduxUser.photo,
  };

  useEffect(() => {
    const unsubscribe = getMessages(chatId, setMessages);
    return () => {
      unsubscribe();
    };
  }, [chatId]);

  const handleSend = (newMessages: IMessage[] = []) => {
    try {
      const message: IMessage = {
        ...newMessages[0],
        createdAt: new Date(newMessages[0].createdAt),
        user: user,
      };
      sendMessage(chatId, message).catch((error: any) => console.error("Error sending message:", error));
    } catch (error: any) {
      console.error("Error in handleSend:", error);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages: IMessage[]) => handleSend(newMessages)}
      user={user}
    />
  );
};

export default ChatScreen;
