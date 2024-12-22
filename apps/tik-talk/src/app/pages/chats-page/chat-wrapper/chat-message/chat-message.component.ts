import {
  Component,
  HostBinding,
  inject,
  Input,
  input,
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { Message } from '../../../../data/interfaces/chat.interface';
import { CircleAvatarComponent } from '@tt/common-ui/src';
import { AddTimezonePipe } from '@tt/shared';
import { Profile, ProfileService } from '@tt/profiles';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CircleAvatarComponent, DatePipe, AddTimezonePipe],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent {
  message = input.required<Message>();
  @Input() profile!: Profile;
  #me = inject(ProfileService).me;

  @HostBinding('class.my-message')
  get isMineMessage() {
    return this.profile.id == this.#me()?.id;
  }
}
