import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SubscriberCardComponent } from '../subscriber-card/subscriber-card.component';
import { AvatarUrlPipe } from '@tt/shared';
import { ProfileService } from '@tt/profiles';
import { SvgIconComponent } from '@tt/common-ui';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  #profileService = inject(ProfileService);
  #chatService = inject(ChatService);
  #destroyRef = inject(DestroyRef);

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
  unreadMessagesCount = this.#chatService.unreadMessagesCount;

  #wsConnection: Subscription = this.#getWSSubscription().subscribe();
  #isWSReconnectNeeded = this.#chatService.isWSAdapterReconnectNeeded;

  constructor() {
    firstValueFrom(this.#profileService.getMe());
    effect(
      () => {
        if (this.#isWSReconnectNeeded()) {
          this.#wsReconnection();
        }
      },
      { allowSignalWrites: true }
    );
  }

  #getWSSubscription() {
    return this.#chatService
      .connectToChatsWS()
      .pipe(takeUntilDestroyed(this.#destroyRef));
  }

  #wsReconnection() {
    this.#wsConnection.unsubscribe();
    this.#wsConnection = this.#getWSSubscription().subscribe();
    this.#isWSReconnectNeeded.set(false);
  }
}
