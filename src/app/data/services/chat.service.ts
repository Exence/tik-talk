import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Chat, MyChat } from "../interfaces/chat.interface";
import { baseApiUrl } from "../config";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  #httpClient = inject(HttpClient)
  #chatApi = `${baseApiUrl}/chat`
  #messageApi = `${baseApiUrl}/message`

  myChats = signal<MyChat[]>([])

  getMyChats() {
    return this.#httpClient.get<MyChat[]>(`${this.#chatApi}/get_my_chats/`).pipe(
      tap(res => this.myChats.set(res))
    )
  }

  createChat(userId: number) {
    return this.#httpClient.post<Chat>(`${this.#chatApi}/${userId}`,{})
  }
}