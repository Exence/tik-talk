import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ChatBtnComponent } from "./chat-btn/chat-btn.component";
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";
import { ChatService } from '../../../data/services/chat.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { MyChat } from '../../../data/interfaces/chat.interface';

@Component({
  selector: 'app-chats-panel',
  standalone: true,
  imports: [ChatBtnComponent, SvgIconComponent, ReactiveFormsModule],
  templateUrl: './chats-panel.component.html',
  styleUrl: './chats-panel.component.scss'
})
export class ChatsPanelComponent implements OnInit, OnDestroy {
  myChats = inject(ChatService).myChats

  chatSearch = new FormControl()
  filteredChats = signal<MyChat[]>([])
  #destroy$ = new Subject<void>();

  ngOnInit() {
    this.filteredChats.set(this.myChats())
    this.chatSearch.valueChanges.pipe(
      takeUntil(this.#destroy$),
      tap(
        value => {
          const filteredChats = this.myChats().filter(chat =>
            chat.userFrom.firstName.toLowerCase().includes(value.toLowerCase()) ||
            chat.userFrom.lastName.toLowerCase().includes(value.toLowerCase())
          )
          this.filteredChats.set(filteredChats)
        }
      )
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
