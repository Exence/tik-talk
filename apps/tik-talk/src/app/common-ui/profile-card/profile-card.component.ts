import { Component, inject, Input } from '@angular/core';
import { ChatService } from '../../data/services/chat.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Profile } from '@tt/profiles';
import { AvatarUrlPipe } from '@tt/shared';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [AvatarUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Profile;

  #chatService = inject(ChatService);
  #router = inject(Router);

  async onCreateChat(id: number) {
    firstValueFrom(this.#chatService.createChat(id)).then((res) => {
      this.#router.navigate(['/chats', res.id]);
    });
  }
}
