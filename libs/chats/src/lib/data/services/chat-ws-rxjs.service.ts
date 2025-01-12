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
      console.log(`WS is connected`);
    }

    return this.#socket.asObservable().pipe(
      tap(message => params.messageHandler(message)),
      finalize(() => console.log(`WS connection is closed`)
      )
    )
  }

  sendMessage(text: string, chatId: number) {
    if (!this.#socket) return
    
    this.#socket?.next({
      text,
      chat_id: chatId
    })
  }

  disconect() {
    if (!this.#socket) return

    this.#socket?.complete()
    this.#socket = null
  }
  
}