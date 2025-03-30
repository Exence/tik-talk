import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core'
import { CircleAvatarComponent, SvgIconComponent } from '@tt/common-ui'
import { TimeAgoPipe } from '@tt/shared'
import { firstValueFrom } from 'rxjs'
import { Comment, CommentCreateDto, Post } from '../../data/interfaces/post.interface'
import { PostService } from '../../data/services/post.service'
import { PostInputComponent } from '../../ui/post-input/post-input.component'
import { SingleCommentComponent } from '../single-comment/single-comment.component'

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    CircleAvatarComponent,
    SvgIconComponent,
    PostInputComponent,
    SingleCommentComponent,
    TimeAgoPipe
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePostComponent implements OnInit {
  post = input<Post>()
  comments = signal<Comment[]>([])

  postService = inject(PostService)

  ngOnInit(): void {
    this.comments.set(this.post()!.comments)
  }

  async onCreateComment(text: string) {
    const comment: CommentCreateDto = {
      text: text,
      postId: this.post()!.id,
      authorId: null,
      commentId: null
    }
    await firstValueFrom(this.postService.createComment(comment))
    firstValueFrom(this.postService.getCommenstByPostId(comment.postId)).then((res) =>
      this.comments.set(res)
    )
  }
}
