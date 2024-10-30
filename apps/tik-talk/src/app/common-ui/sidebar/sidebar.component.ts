import { Component, inject, OnInit } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '../../data/services/profile.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { AvatarUrlPipe } from '../../helpers/pipes/avatar-url.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
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
