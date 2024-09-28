import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { SvgIconComponent } from "../../common-ui/svg-icon/svg-icon.component";
import { AvatarUrlPipe } from "../../helpers/pipes/avatar-url.pipe";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [AsyncPipe, ProfileHeaderComponent, RouterLink, SvgIconComponent, AvatarUrlPipe],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)
  isProfileMeUrl: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isProfileMeUrl = this.router.url === '/profile/me';
      }
    });
  }
  me$ = toObservable(this.profileService.me)

  subscribers$ = this.profileService.getSubscribersShortList(5)

  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      if (id === 'me') return this.me$

      return this.profileService.getAccountById(id)
    })
  )
  
}
