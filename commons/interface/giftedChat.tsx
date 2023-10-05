export interface User {
  _id: string;
  name: string;
  avatar: string;
}

export interface IMessage {
  _id: string;
  text: string;
  createdAt: Date;
  user: User;
  image?: string;
}
