import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { CircleAvatarComponent } from '@tt/common-ui'
import { Profile } from '@tt/data-access'

@Component({
  selector: 'tt-chat-header',
  standalone: true,
  imports: [CircleAvatarComponent],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatHeaderComponent {
  companion = input.required<Profile>()
}
