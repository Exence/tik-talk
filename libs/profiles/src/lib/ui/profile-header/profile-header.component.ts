import { Component, input } from '@angular/core';
import { Profile } from '@tt/common-interfaces/profile';
import { CircleAvatarComponent } from '@tt/common-ui';
import { AvatarUrlPipe } from '@tt/shared';

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
