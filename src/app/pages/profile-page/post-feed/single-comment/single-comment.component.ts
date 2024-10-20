import { Component, input } from '@angular/core';
import { CircleAvatarComponent } from "../../../../common-ui/circle-avatar/circle-avatar.component";
import { Comment } from '../../../../data/interfaces/post.interface';
import { getCreateOrUpdatePostDateString } from '../../../../helpers/time-ago';

@Component({
  selector: 'app-single-comment',
  standalone: true,
  imports: [CircleAvatarComponent],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.scss'
})
export class SingleCommentComponent {
  comment = input<Comment>()

  getCommentTimeString(createdAt: string, updatedAt: string | null | undefined) {
    return getCreateOrUpdatePostDateString(createdAt, updatedAt)
  }
}
