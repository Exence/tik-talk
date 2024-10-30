import { Profile } from './profile.interface';

export interface Chat {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  messages: Message[] | null;
  companion?: Profile;
}

export interface MyChat {
  id: number;
  userFrom: Profile;
  message: string | null;
  createdAt: string | null;
  unreadMessages: number;
}

export interface Message {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt: string | null;
}

export interface MessageCreateDto {
  message: string;
}
