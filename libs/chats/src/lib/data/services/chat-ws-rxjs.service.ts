import { WebSocketSubject } from "rxjs/internal/observable/dom/WebSocketSubject"
import { webSocket } from "rxjs/webSocket"
import { ChatWSConnectionParams, ChatWSService } from "../interfaces/chat-ws-service.interface";
import { ChatWSMessage } from "../interfaces/chat-ws-message.interface";
import { finalize, tap } from "rxjs";

export class ChatWSRXJSService implements ChatWSService {
  #socket: WebSocketSubject<ChatWSMessage> | null = null

  connect(params: ChatWSConnectionParams) {
    if (!this.#socket) {
      this.#socket = webSocket({
        url: params.url,
        protocol: [params.token]
      })
    }

    return this.#socket.asObservable().pipe(
      tap(message => params.messageHandler(message)),
      finalize(() => console.log(`WS connection is closed`)
      )
    )
  }

  sendMessage(text: string, chatId: number) {
    this.#socket?.next({
      text,
      chat_id: chatId
    })
  }

  disconect() {
    this.#socket?.complete()
  }
  
}