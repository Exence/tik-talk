import { ChatWSMessage, ChatWSNewMessage, ChatWSUnreadMessage } from "./chat-ws-message.interface";

export function isUnreadWSMessage(message: ChatWSMessage): message is ChatWSUnreadMessage {
  return 'action' in message && message.action === 'unread'
}

export function isNewWSMessage(message: ChatWSMessage): message is ChatWSNewMessage {
  return 'action' in message && message.action === 'message'
}
