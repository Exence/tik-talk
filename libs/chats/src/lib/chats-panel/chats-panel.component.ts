import {
  Component,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '@tt/common-ui';
import { ChatBtnComponent } from '../chat-btn/chat-btn.component';
import { ChatService } from '../data/services/chat.service';

@Component({
  selector: 'app-chats-panel',
  standalone: true,
  imports: [AsyncPipe, ChatBtnComponent, SvgIconComponent, ReactiveFormsModule],
  templateUrl: './chats-panel.component.html',
  styleUrl: './chats-panel.component.scss',
})
export class ChatsPanelComponent {
  chatService = inject(ChatService);

  chatSearch = new FormControl();

  filteredChats$ = this.chatService.getMyChats().pipe(
    switchMap((chats) => {
      return this.chatSearch.valueChanges.pipe(
        startWith(''),
        map((value) => {
          return chats.filter((chat) =>
            `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase())
          );
        })
      );
    })
  );
}
