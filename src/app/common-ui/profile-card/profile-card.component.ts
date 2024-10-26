import { Component, inject, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { AvatarUrlPipe } from '../../helpers/pipes/avatar-url.pipe';
import { ChatService } from '../../data/services/chat.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [AvatarUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: Profile
  
  #chatService = inject(ChatService)
  #router = inject(Router)

  async onCreateChat(id: number){
    firstValueFrom(this.#chatService.createChat(id))
      .then((res) => {
        this.#router.navigate(['/chats',res.id])
      })
  }
}
