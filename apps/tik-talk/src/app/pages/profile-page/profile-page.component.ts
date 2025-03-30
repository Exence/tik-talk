import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { ChatService } from '@tt/chats'
import { SvgIconComponent } from '@tt/common-ui'
import { postActions, PostCreateDto, PostFeedComponent, PostInputComponent } from '@tt/posts'
import { ProfileHeaderComponent, ProfileService } from '@tt/profiles'
import { AvatarUrlPipe } from '@tt/shared'
import { firstValueFrom, switchMap } from 'rxjs'

const angularimports = [AsyncPipe, RouterLink]

const appImports = [
  AvatarUrlPipe,
  PostFeedComponent,
  PostInputComponent,
  ProfileHeaderComponent,
  SvgIconComponent
]

@Component({
  selector: 'tt-profile-page',
  standalone: true,
  imports: [...angularimports, ...appImports],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {
  #profileService = inject(ProfileService)
  #chatService = inject(ChatService)

  #route = inject(ActivatedRoute)
  #router = inject(Router)

  #me = this.#profileService.me
  #me$ = toObservable(this.#me)
  #store$ = inject(Store)

  isProfileMeUrl = signal<boolean>(false)

  subscribers$ = this.#profileService.getSubscribersShortList(5)

  profile$ = this.#route.params.pipe(
    switchMap(({ id }) => {
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
      communityId: null
    }
    this.#store$.dispatch(postActions.createPost({ post }))
  }

  async onCreateChat(id: number) {
    firstValueFrom(this.#chatService.createChat(id)).then((res) => {
      this.#router.navigate(['/chats', res.id])
    })
  }
}
