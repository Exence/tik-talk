import { ChatWSMessage } from './chat-ws-message.interface'

export interface ChatWSConnectionParams {
  url: string
  token: string
  messageHandler: (message: ChatWSMessage) => void
}

export interface ChatWSService {
  connect: (params: ChatWSConnectionParams) => void
  sendMessage: (text: string, chatId: number) => void
  disconect: () => void
}
