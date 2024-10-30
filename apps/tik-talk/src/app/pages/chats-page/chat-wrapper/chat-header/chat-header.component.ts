import { Component, input } from '@angular/core';
import { CircleAvatarComponent } from '../../../../common-ui/circle-avatar/circle-avatar.component';
import { Profile } from '../../../../data/interfaces/profile.interface';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CircleAvatarComponent],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent {
  companion = input.required<Profile>();
}
