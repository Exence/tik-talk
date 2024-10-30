import { Component, input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { AvatarUrlPipe } from '../../helpers/pipes/avatar-url.pipe';
import { CircleAvatarComponent } from '../circle-avatar/circle-avatar.component';

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
