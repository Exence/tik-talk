import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { PostInputComponent } from '../../../common-ui/post-input/post-input.component';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Subscription, switchMap, tap, timer } from 'rxjs';
import { ChatService } from '../../../data/services/chat.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { DatedMessages, Message } from '../../../data/interfaces/chat.interface';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ProfileService } from '../../../data/services/profile.service';
import { RelativeDatePipe } from '../../../helpers/pipes/relative-date.pipe';

@Component({
  selector: 'app-chat-wrapper',
  standalone: true,
  imports: [
    ChatHeaderComponent,
    PostInputComponent,
    AsyncPipe,
    ChatMessageComponent,
    DatePipe,
    RelativeDatePipe,
  ],
  templateUrl: './chat-wrapper.component.html',
  styleUrl: './chat-wrapper.component.scss',
})
export class ChatWrapperComponent implements AfterViewInit {
  @ViewChild('chatMessages', { static: false })
  chatMessages!: ElementRef;

  #currentDate: string | null = '';

  #route = inject(ActivatedRoute);
  #chatService = inject(ChatService);

  messages = signal<DatedMessages[]>([]);
  me = inject(ProfileService).me();

  #messagesTimer = timer(2000, 5000);
  #messagesTimerSubscription!: Subscription;

  activeChat$ = this.#route.params.pipe(
    tap(({ id }) => {
      if (this.#messagesTimerSubscription)
        this.#messagesTimerSubscription.unsubscribe();

      this.#currentDate = '';
      this.#messagesTimerSubscription = this.#messagesTimer.subscribe(() => {
        this.getChatById(id)
      });
    }),
    switchMap(({ id }) =>
      this.#chatService
        .getChatById(id)
        .pipe(tap((chat) => this.messages.set(chat.datedMessages ?? [])))
    )
  );

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToBottom();
    }, 1000);
  }

  async getChatById(id: number) {
    return await firstValueFrom(
      this.#chatService.getChatById(id).pipe(
        tap((chat) => {
          let isScrollNeeded = false;
          if (this.chatMessages) {
            const container = this.chatMessages.nativeElement;
            isScrollNeeded =
              container.scrollHeight - container.scrollTop ===
              container.clientHeight;
          }
          this.messages.set(chat.datedMessages ?? []);

          if (isScrollNeeded) {
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
          }
        })
      )
    );
  }

  async onSendMessage(chatId: number, text: string) {
    await firstValueFrom(this.#chatService.sendMessage(chatId, text));
    this.getChatById(chatId)
  }

  scrollToBottom() {
    if (this.chatMessages) {
      const container = this.chatMessages.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  isNotTheSameDate(date: string | null) {
    if (!(date === this.#currentDate)) {
      this.#currentDate = date;
      return true;
    }

    return false;
  }

  ngOnDestroy(): void {
    this.#messagesTimerSubscription.unsubscribe();
  }
}
