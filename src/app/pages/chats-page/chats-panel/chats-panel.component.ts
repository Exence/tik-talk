import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ChatBtnComponent } from "./chat-btn/chat-btn.component";
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";
import { ChatService } from '../../../data/services/chat.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, map, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { MyChat } from '../../../data/interfaces/chat.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chats-panel',
  standalone: true,
  imports: [AsyncPipe, ChatBtnComponent, SvgIconComponent, ReactiveFormsModule],
  templateUrl: './chats-panel.component.html',
  styleUrl: './chats-panel.component.scss'
})
export class ChatsPanelComponent {
  chatService = inject(ChatService)

  chatSearch = new FormControl()
  
  filteredChats$ = this.chatService.getMyChats().pipe(
    switchMap(chats => {
      return this.chatSearch.valueChanges.pipe(
        startWith(''),
        map(value => {
          return chats.filter(chat => `${chat.userFrom.firstName} ${chat.userFrom.lastName}`.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        })
      )
    })
  )

}
