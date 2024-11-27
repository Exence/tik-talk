import { Component, input } from '@angular/core';
import { MyChat } from '../../../../data/interfaces/chat.interface';
import { CircleAvatarComponent } from '../../../../common-ui/circle-avatar/circle-avatar.component';
import { TimeOrDatePipe } from '../../../../helpers/pipes/time-or-date.pipe';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddTimezonePipe } from '../../../../helpers/pipes/add-timezone.pipe';

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
