import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Chat, Message, MessageCreateDto, MyChat } from "../interfaces/chat.interface";
import { baseApiUrl } from "../config";
import { firstValueFrom, map, switchMap, tap } from "rxjs";
import { ProfileService } from "./profile.service";
import { Profile } from "../interfaces/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  #httpClient = inject(HttpClient)
  #profileService = inject(ProfileService)

  #myId = this.#profileService.me()?.id
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

  getChatById(chatId: number) {
    return this.#httpClient.get<Chat>(`${this.#chatApi}/${chatId}`).pipe(
      tap(() => {firstValueFrom(this.getMyChats())}),
      map(chat => {
        return {
          ...chat,
          companion: chat.userFirst.id === this.#myId? chat.userSecond : chat.userFirst
        }
      })
    )
  }

  sendMessage(chatId: number, text: string) {
    const payload = {message: text}
    const params = new HttpParams({ fromObject: payload });

    return this.#httpClient.post<Message>(`${this.#messageApi}/send/${chatId}`,{}, { params })
  }

}