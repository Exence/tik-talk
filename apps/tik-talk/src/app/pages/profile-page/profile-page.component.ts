import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { ChatService } from '@tt/chats';
import { AvatarUrlPipe } from '@tt/shared';
import { PostFeedComponent, PostInputComponent, PostService, PostCreateDto } from '@tt/posts';
import { SvgIconComponent } from '@tt/common-ui';
import { ProfileService, ProfileHeaderComponent } from '@tt/profiles';

const angularimports = [AsyncPipe, RouterLink];

const appImports = [
  AvatarUrlPipe,
  PostFeedComponent,
  PostInputComponent,
  ProfileHeaderComponent,
  SvgIconComponent,
];

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [...angularimports, ...appImports],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  #profileService = inject(ProfileService);
  #postService = inject(PostService);
  #chatService = inject(ChatService);

  #route = inject(ActivatedRoute);
  #router = inject(Router);

  #me = this.#profileService.me;
  #me$ = toObservable(this.#me);

  isProfileMeUrl = signal<boolean>(false);

  subscribers$ = this.#profileService.getSubscribersShortList(5);

  profile$ = this.#route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me' || id == this.#me()?.id) {
        this.isProfileMeUrl.set(true);
        return this.#me$;
      }

      this.isProfileMeUrl.set(false);
      return this.#profileService.getAccountById(id);
    })
  );

  onSendPost(content: string) {
    const post: PostCreateDto = {
      title: 'NEW Post',
      content: content,
      authorId: this.#me()!.id,
      communityId: null,
    };
    firstValueFrom(this.#postService.createPost(post));
  }

  async onCreateChat(id: number) {
    firstValueFrom(this.#chatService.createChat(id)).then((res) => {
      this.#router.navigate(['/chats', res.id]);
    });
  }
}
