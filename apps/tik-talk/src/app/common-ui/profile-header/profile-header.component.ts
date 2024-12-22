import { Component, input } from '@angular/core';
import { AvatarUrlPipe } from '@tt/shared';
import { CircleAvatarComponent } from '@tt/common-ui';
import { Profile } from '@tt/profiles';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [AvatarUrlPipe, CircleAvatarComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
