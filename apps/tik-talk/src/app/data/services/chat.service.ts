import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Chat,
  Message,
  DatedMessages,
  MyChat,
} from '../interfaces/chat.interface';
import { baseApiUrl } from '@tt/shared';
import { firstValueFrom, map, tap } from 'rxjs';
import { ProfileService } from './profile.service';
import { DateTime } from 'luxon'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  #httpClient = inject(HttpClient);
  #profileService = inject(ProfileService);

  #myId = this.#profileService.me()?.id;
  #chatApi = `${baseApiUrl}/chat`;
  #messageApi = `${baseApiUrl}/message`;

  myChats = signal<MyChat[]>([]);

  getMyChats() {
    return this.#httpClient
      .get<MyChat[]>(`${this.#chatApi}/get_my_chats/`)
      .pipe(tap((res) => this.myChats.set(res)));
  }

  createChat(userId: number) {
    return this.#httpClient.post<Chat>(`${this.#chatApi}/${userId}`, {});
  }

  getChatById(chatId: number) {
    return this.#httpClient.get<Chat>(`${this.#chatApi}/${chatId}`).pipe(
      tap(() => {
        firstValueFrom(this.getMyChats());
      }),
      map((chat) => {
        return {
          ...chat,
          companion:
            chat.userFirst.id === this.#myId ? chat.userSecond : chat.userFirst,
          datedMessages: this.groupMessagesByDate(chat.messages?? [])
        };
      })
    );
  }

  groupMessagesByDate(messages: Message[]) {
    const groupMessages: Record<string, Message[]> = {}
    messages.forEach(
      (message) => {
        const date = DateTime.fromISO(message.createdAt).toISODate()?? 'No date';
        
        if (!groupMessages[date]) groupMessages[date] = []

        groupMessages[date].push(message)
      }
    )

    const result: DatedMessages[] = []
    
    Object.entries(groupMessages).forEach(([date, messages]) => {
      result.push({date: date, messages: messages})
    })

    return result
  }

  sendMessage(chatId: number, text: string) {
    const payload = { message: text };
    const params = new HttpParams({ fromObject: payload });

    return this.#httpClient.post<Message>(
      `${this.#messageApi}/send/${chatId}`,
      {},
      { params }
    );
  }
}
