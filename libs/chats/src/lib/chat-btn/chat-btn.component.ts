import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddTimezonePipe, TimeOrDatePipe } from '@tt/shared';
import { CircleAvatarComponent } from '@tt/common-ui';
import { MyChat } from '../data/interfaces/chat.interface';

@Component({
  selector: 'app-chat-btn',
  standalone: true,
  imports: [
    AddTimezonePipe,
    CircleAvatarComponent,
    TimeOrDatePipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './chat-btn.component.html',
  styleUrl: './chat-btn.component.scss',
})
export class ChatBtnComponent {
  chat = input.required<MyChat>();
}
