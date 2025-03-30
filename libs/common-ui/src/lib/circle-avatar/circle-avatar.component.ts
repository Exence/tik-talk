import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { AvatarUrlPipe } from '../../../../shared/src/lib/helpers/pipes/avatar-url.pipe'

@Component({
  selector: 'tt-circle-avatar',
  standalone: true,
  imports: [AvatarUrlPipe],
  templateUrl: './circle-avatar.component.html',
  styleUrl: './circle-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleAvatarComponent {
  avatarUrl = input<string | null>(null)
}
