import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SubscriberCardComponent } from '../subscriber-card/subscriber-card.component';
import { AvatarUrlPipe } from '@tt/shared';
import { ProfileService } from '@tt/profiles';
import { SvgIconComponent } from '@tt/common-ui'
import { ChatService } from '@tt/chats';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    SvgIconComponent,
    SubscriberCardComponent,
    AvatarUrlPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  #profileService = inject(ProfileService);
  #chatService = inject(ChatService)
  me = this.#profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: '/profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: '/chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/search',
    },
  ];

  subscribers$ = this.#profileService.getSubscribersShortList();
  unreadMessagesCount = this.#chatService.unreadMessagesCount

  constructor() {
    firstValueFrom(this.#profileService.getMe());
    this.#chatService.connectToChatsWS().pipe(
      takeUntilDestroyed()
    ).subscribe()
  }
}
