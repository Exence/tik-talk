import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { Profile } from '@tt/common-interfaces/profile'
import { CircleAvatarComponent } from '@tt/common-ui'

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CircleAvatarComponent],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatHeaderComponent {
  companion = input.required<Profile>()
}
