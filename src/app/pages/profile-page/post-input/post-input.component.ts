import { Component, inject, Input, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CircleAvatarComponent } from "../../../common-ui/circle-avatar/circle-avatar.component";
import { ProfileService } from '../../../data/services/profile.service';
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";
import { Post, PostCreateDto } from '../../../data/interfaces/post.interface';
import { PostService } from '../../../data/services/post.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [FormsModule, CircleAvatarComponent, SvgIconComponent],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  @Input() palaceholder = ''

  me = inject(ProfileService).me() 
  avatarUrl = this.me?.avatarUrl ?? ''
  content = ''
  #r2 = inject(Renderer2)
  #postService = inject(PostService)

  onTextareaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
    this.#r2.setStyle(textarea, 'height', 'auto')
    this.#r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  onCreatePost() {
    if (!this.content) return

    const post: PostCreateDto = {
      title: 'NEW Post',
      content: this.content,
      authorId: this.me!.id,
      communityId: null,
    }
    firstValueFrom(this.#postService.createPost(post))
  }
}
