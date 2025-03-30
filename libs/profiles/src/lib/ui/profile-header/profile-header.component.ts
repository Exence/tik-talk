import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { Profile } from '@tt/common-interfaces/profile'
import { CircleAvatarComponent } from '@tt/common-ui'

@Component({
  selector: 'tt-profile-header',
  standalone: true,
  imports: [CircleAvatarComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileHeaderComponent {
  profile = input<Profile>()
}
