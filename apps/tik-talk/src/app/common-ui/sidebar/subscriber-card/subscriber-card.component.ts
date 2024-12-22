import { Component, Input } from '@angular/core';
import { AvatarUrlPipe } from '@tt/shared';
import { Profile } from '@tt/profiles';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [AvatarUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
