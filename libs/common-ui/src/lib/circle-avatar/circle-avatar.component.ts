import { Component, input } from '@angular/core';
import { AvatarUrlPipe } from '../../../../shared/src/lib/helpers/pipes/avatar-url.pipe';

@Component({
  selector: 'app-circle-avatar',
  standalone: true,
  imports: [AvatarUrlPipe],
  templateUrl: './circle-avatar.component.html',
  styleUrl: './circle-avatar.component.scss',
})
export class CircleAvatarComponent {
  avatarUrl = input<string | null>(null);
}
