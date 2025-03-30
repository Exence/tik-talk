import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Profile } from '@tt/common-interfaces/profile'
import { AvatarUrlPipe } from '@tt/shared'

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [AvatarUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriberCardComponent {
  @Input() profile!: Profile
}
