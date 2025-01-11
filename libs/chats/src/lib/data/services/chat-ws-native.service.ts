import { ChatWSConnectionParams, ChatWSService } from "../interfaces/chat-ws-service.interface";

export class ChatWSNativeService implements ChatWSService {
  #soket: WebSocket | null = null

  connect(params: ChatWSConnectionParams) {
    if (this.#soket) return
    
    this.#soket = new WebSocket(params.url, [params.token])

    this.#soket.onmessage = (event: MessageEvent) => {
      params.messageHandler(JSON.parse(event.data))
    }

    this.#soket.onclose = () => {
      console.log(`WS connection is closed`);
    }
  };

  sendMessage(text: string, chatId: number) {
    this.#soket?.send(
      JSON.stringify({
        text,
        chat_id: chatId
      })
    )
  }

  disconect() {
    this.#soket?.close()
  }

}