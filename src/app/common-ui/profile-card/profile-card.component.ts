import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { AvatarUrlPipe } from '../../helpers/pipes/avatar-url.pipe';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [AvatarUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: Profile
}
