import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { CircleAvatarComponent } from '@tt/common-ui'
import { AddTimezonePipe, TimeOrDatePipe } from '@tt/shared'
import { MyChat } from '../data/interfaces/chat.interface'

@Component({
  selector: 'tt-chat-btn',
  standalone: true,
  imports: [AddTimezonePipe, CircleAvatarComponent, TimeOrDatePipe, RouterLink, RouterLinkActive],
  templateUrl: './chat-btn.component.html',
  styleUrl: './chat-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatBtnComponent {
  chat = input.required<MyChat>()
}
