import { Component, input } from '@angular/core';
import { CircleAvatarComponent } from '@tt/common-ui';
import { Profile } from '@tt/profiles';

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
