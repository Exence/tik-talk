import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { SvgIconComponent } from "../../common-ui/svg-icon/svg-icon.component";
import { AvatarUrlPipe } from "../../helpers/pipes/avatar-url.pipe";
import { PostInputComponent } from '../../common-ui/post-input/post-input.component';
import { PostCreateDto } from '../../data/interfaces/post.interface';
import { PostService } from '../../data/services/post.service';
import { PostFeedComponent } from "./post-feed/post-feed.component";
import { ChatService } from '../../data/services/chat.service';

const angularimports = [
  AsyncPipe,
  RouterLink,
]

const appImports = [
  AvatarUrlPipe,
  PostFeedComponent,
  PostInputComponent,
  ProfileHeaderComponent,
  SvgIconComponent,
]

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ ...angularimports, ...appImports ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  #profileService = inject(ProfileService)
  #postService = inject(PostService)
  #chatService = inject(ChatService)

  #route = inject(ActivatedRoute)
  #router = inject(Router)

  #me = this.#profileService.me
  #me$ = toObservable(this.#me)

  isProfileMeUrl = signal<boolean>(false);

  subscribers$ = this.#profileService.getSubscribersShortList(5)

  profile$ = this.#route.params.pipe(
    switchMap(({id}) => {
      if (id === 'me' || id == this.#me()?.id) {
        this.isProfileMeUrl.set(true)
        return this.#me$
      }

      this.isProfileMeUrl.set(false)
      return this.#profileService.getAccountById(id)
    })
  )

  onSendPost(content: string) {
    const post: PostCreateDto = {
      title: 'NEW Post',
      content: content,
      authorId: this.#me()!.id,
      communityId: null,
    }
    firstValueFrom(this.#postService.createPost(post))
  }

  async onCreateChat(id: number) {
    firstValueFrom(this.#chatService.createChat(id))
    .then((res) => {
      this.#router.navigate(['/chats',res.id])
    })
  }
  
}
