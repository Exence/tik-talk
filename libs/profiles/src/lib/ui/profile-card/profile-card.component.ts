import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Profile } from '@tt/data-access'
import { AvatarUrlPipe } from '@tt/shared'

@Component({
  selector: 'tt-profile-card',
  standalone: true,
  imports: [AvatarUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {
  @Input() profile!: Profile

  #router = inject(Router)

  async onCreateChat(id: number) {
    this.#router.navigate(['/chats', 'new'], { queryParams: { userId: id } })
  }
}
