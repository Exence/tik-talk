import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SubscriberCardComponent } from '../subscriber-card/subscriber-card.component';
import { AvatarUrlPipe } from '@tt/shared';
import { ProfileService } from '@tt/profiles';
import { SvgIconComponent } from '@tt/common-ui'

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
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  me = this.profileService.me;

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

  subscribers$ = this.profileService.getSubscribersShortList();

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
