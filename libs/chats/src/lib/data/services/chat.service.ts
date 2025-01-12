import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Chat,
  Message,
  DatedMessages,
  MyChat,
} from '../interfaces/chat.interface';
import { AuthService} from '@tt/auth'
import { baseApiUrl } from '@tt/shared';
import { firstValueFrom, map, tap } from 'rxjs';
import { DateTime } from 'luxon'
import { ProfileService } from '@tt/profiles';
import { ChatWSConnectionParams } from '../interfaces/chat-ws-service.interface';
import { ChatWSMessage, ChatWSNewMessage } from '../interfaces/chat-ws-message.interface';
import { isErrorWSMessage, isNewWSMessage, isUnreadWSMessage } from '../interfaces/chat-ws-type-guards';
import { ChatWSRXJSService } from './chat-ws-rxjs.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  #httpClient = inject(HttpClient);
  #profileService = inject(ProfileService);
  #authService = inject(AuthService)

  #myId = this.#profileService.me()?.id;
  #chatApi = `${baseApiUrl}/chat`;
  #messageApi = `${baseApiUrl}/message`;

  wsAdapter = new ChatWSRXJSService()
  isWSAdapterReconnectNeeded = signal<boolean>(false)

  activeChatMessages = signal<DatedMessages[]>([]);
  unreadMessagesCount = signal<number>(0)

  myChats = signal<MyChat[]>([]);

  connectToChatsWS() {
    const params: ChatWSConnectionParams = {
      url: `${this.#chatApi}/ws`,
      token: this.#authService.accessToken ?? '',
      messageHandler: this.messageHandler
    }

    return this.wsAdapter.connect(params)
  }

  messageHandler = async (handeledMessage: ChatWSMessage) => {
    if (isNewWSMessage(handeledMessage)) {
      const message = this.#createChatMessageFromHandeledMessage(handeledMessage)
      this.#updateActiveChatMessagesWithMessage(message)
    }

    if (isUnreadWSMessage(handeledMessage)) {
      this.unreadMessagesCount.set(handeledMessage.data.count)
    }

    if (isErrorWSMessage(handeledMessage) && handeledMessage.message === 'Invalid token') {
      await firstValueFrom(this.#authService.getRefreshedToken())

      this.wsAdapter.disconect()
        
      this.isWSAdapterReconnectNeeded.set(true)
    }
  }

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
      map((chat) => {
        return {
          ...chat,
          companion:
            chat.userFirst.id === this.#myId ? chat.userSecond : chat.userFirst,
          datedMessages: this.groupMessagesByDate(chat.messages?? [])
        };
      }),
      tap(chat => {
        this.activeChatMessages.set(chat.datedMessages);
        firstValueFrom(this.getMyChats());
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
      result.push({ date, messages})
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

  #createChatMessageFromHandeledMessage(handeledMessage: ChatWSNewMessage) {
    const message: Message = {
      id: handeledMessage.data.id,
      userFromId: handeledMessage.data.author,
      personalChatId: handeledMessage.data.chat_id,
      text: handeledMessage.data.message,
      createdAt: handeledMessage.data.created_at,
      isRead: false,
      isMine: false
    }

    return message
  }

  #updateActiveChatMessagesWithMessage(message: Message) {
    const messageDate = DateTime.fromFormat(message.createdAt, "yyyy-MM-dd HH:mm:ss").toISODate()?? 'No date';
    const datedMessages = [...this.activeChatMessages()]

    const index = datedMessages.findIndex(datedMessage => {
      return datedMessage.date == messageDate
    })

    if (index == -1) {
      datedMessages.push({ date: messageDate, messages: [message] })
    } else {
      datedMessages[index].messages.push(message)
    }

    this.activeChatMessages.set(datedMessages)  
  }
}
