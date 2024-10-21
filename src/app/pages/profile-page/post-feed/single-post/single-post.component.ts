import { Component, ElementRef, inject, input, Input, OnInit, Renderer2, signal } from '@angular/core';
import { Post, CommentCreateDto, Comment } from '../../../../data/interfaces/post.interface';
import { CircleAvatarComponent } from "../../../../common-ui/circle-avatar/circle-avatar.component";
import { SvgIconComponent } from '../../../../common-ui/svg-icon/svg-icon.component';
import { PostInputComponent } from "../../../../common-ui/post-input/post-input.component";
import { PostService } from '../../../../data/services/post.service';
import { firstValueFrom, tap } from 'rxjs';
import { SingleCommentComponent } from "../single-comment/single-comment.component";
import { TimeAgoPipe } from "../../../../helpers/pipes/time-ago.pipe";

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [CircleAvatarComponent, SvgIconComponent, PostInputComponent, SingleCommentComponent, TimeAgoPipe],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss'
})
export class SinglePostComponent implements OnInit{
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
    firstValueFrom(this.postService.getCommenstByPostId(comment.postId)).then(
      res => this.comments.set(res)
    )
  }
}