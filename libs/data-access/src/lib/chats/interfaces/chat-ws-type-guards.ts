import {
  ChatWSErrorMessage,
  ChatWSMessage,
  ChatWSNewMessage,
  ChatWSUnreadMessage
} from './chat-ws-message.interface'

export function isUnreadWSMessage(message: ChatWSMessage): message is ChatWSUnreadMessage {
  return 'action' in message && message.action === 'unread'
}

export function isNewWSMessage(message: ChatWSMessage): message is ChatWSNewMessage {
  return 'action' in message && message.action === 'message'
}

export function isErrorWSMessage(message: ChatWSMessage): message is ChatWSErrorMessage {
  return 'status' in message && message.status === 'error'
}
