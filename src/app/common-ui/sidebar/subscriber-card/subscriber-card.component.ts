import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';
import { AvatarUrlPipe } from '../../../helpers/pipes/avatar-url.pipe';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [AvatarUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss'
})
export class SubscriberCardComponent {
  @Input() profile!: Profile
}
