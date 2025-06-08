import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { CircleAvatarComponent } from '@tt/common-ui'
import { Profile } from '@tt/data-access'

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
