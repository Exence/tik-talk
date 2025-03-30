import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  Input,
  input
} from '@angular/core'

import { DatePipe } from '@angular/common'
import { Profile } from '@tt/common-interfaces/profile'
import { CircleAvatarComponent } from '@tt/common-ui/src'
import { ProfileService } from '@tt/profiles'
import { AddTimezonePipe } from '@tt/shared'
import { Message } from '../data/interfaces/chat.interface'

@Component({
  selector: 'tt-chat-message',
  standalone: true,
  imports: [CircleAvatarComponent, DatePipe, AddTimezonePipe],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent {
  message = input.required<Message>()
  @Input() profile!: Profile
  #me = inject(ProfileService).me

  @HostBinding('class.my-message')
  get isMineMessage() {
    return this.profile.id == this.#me()?.id
  }
}
