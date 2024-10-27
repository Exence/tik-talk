import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { ChatHeaderComponent } from "./chat-header/chat-header.component";
import { PostInputComponent } from "../../../common-ui/post-input/post-input.component";
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, switchMap, tap } from 'rxjs';
import { ChatService } from '../../../data/services/chat.service';
import { AsyncPipe } from '@angular/common';
import { Message } from '../../../data/interfaces/chat.interface';
import { ChatMessageComponent } from "./chat-message/chat-message.component";
import { ProfileService } from '../../../data/services/profile.service';

@Component({
  selector: 'app-chat-wrapper',
  standalone: true,
  imports: [ChatHeaderComponent, PostInputComponent, AsyncPipe, ChatMessageComponent],
  templateUrl: './chat-wrapper.component.html',
  styleUrl: './chat-wrapper.component.scss'
})
export class ChatWrapperComponent implements AfterViewInit{ 
  @ViewChild("chatMessages", {static: false})
  chatMessages!: ElementRef

  #route = inject(ActivatedRoute)
  #chatService = inject(ChatService)

  messages = signal<Message[]>([])
  me = inject(ProfileService).me()

  activeChat$ = this.#route.params.pipe(
    switchMap(({id}) => this.#chatService.getChatById(id).pipe(
      tap((chat) => this.messages.set(chat.messages?? []))
    ))
  )

  ngAfterViewInit(): void {
    
    setTimeout(() => {
      this.scrollToBottom();
    }, 1000);
  }

  onSendMessage(chatId: number, text: string){
    firstValueFrom(this.#chatService.sendMessage(chatId,text).pipe(
      tap((message) => this.messages.set([...this.messages(), message]))
    ))
  }

  scrollToBottom() {
    if (this.chatMessages) { 
      const container = this.chatMessages.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }
}
