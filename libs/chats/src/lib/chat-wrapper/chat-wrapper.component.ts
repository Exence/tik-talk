import { AsyncPipe } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewChild
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PostInputComponent } from '@tt/posts'
import { ProfileService } from '@tt/profiles'
import { RelativeDatePipe } from '@tt/shared'
import { filter, firstValueFrom, of, switchMap, tap } from 'rxjs'
import { ChatHeaderComponent } from '../chat-header/chat-header.component'
import { ChatMessageComponent } from '../chat-message/chat-message.component'
import { ChatService } from '../data/services/chat.service'

@Component({
  selector: 'tt-chat-wrapper',
  standalone: true,
  imports: [
    ChatHeaderComponent,
    PostInputComponent,
    AsyncPipe,
    ChatMessageComponent,
    RelativeDatePipe
  ],
  templateUrl: './chat-wrapper.component.html',
  styleUrl: './chat-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWrapperComponent implements AfterViewInit {
  @ViewChild('chatMessages', { static: false })
  chatMessages!: ElementRef

  #route = inject(ActivatedRoute)
  #router = inject(Router)
  #chatService = inject(ChatService)

  messages = this.#chatService.activeChatMessages
  me = inject(ProfileService).me()

  activeChat$ = this.#route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'new') {
        return this.#route.queryParams.pipe(
          filter(({ userId }) => userId),
          switchMap(({ userId }) => {
            return this.#chatService.createChat(userId).pipe(
              switchMap((chatId) => {
                this.#router.navigate(['/chats', chatId])
                return of(null)
              })
            )
          })
        )
      }
      return this.#chatService.getChatById(id)
    })
  )

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToBottom()
    }, 1000)
  }

  async getChatById(id: number) {
    return await firstValueFrom(
      this.#chatService.getChatById(id).pipe(
        tap((chat) => {
          let isScrollNeeded = false
          if (this.chatMessages) {
            const container = this.chatMessages.nativeElement
            isScrollNeeded = container.scrollHeight - container.scrollTop === container.clientHeight
          }
          this.messages.set(chat.datedMessages ?? [])

          if (isScrollNeeded) {
            setTimeout(() => {
              this.scrollToBottom()
            }, 100)
          }
        })
      )
    )
  }

  async onSendMessage(chatId: number, text: string) {
    this.#chatService.wsAdapter.sendMessage(text, chatId)
    this.scrollToBottom()
  }

  scrollToBottom() {
    if (this.chatMessages) {
      const container = this.chatMessages.nativeElement
      container.scrollTop = container.scrollHeight
    }
  }
}
