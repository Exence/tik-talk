import {
  Component,
  HostBinding,
  inject,
  Input,
  input,
  signal,
} from '@angular/core';
import { Message } from '../../../../data/interfaces/chat.interface';
import { CircleAvatarComponent } from '../../../../common-ui/circle-avatar/circle-avatar.component';
import { Profile } from '../../../../data/interfaces/profile.interface';
import { TimeOrDatePipe } from '../../../../helpers/pipes/time-or-date.pipe';
import { ProfileService } from '../../../../data/services/profile.service';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CircleAvatarComponent, TimeOrDatePipe],
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
