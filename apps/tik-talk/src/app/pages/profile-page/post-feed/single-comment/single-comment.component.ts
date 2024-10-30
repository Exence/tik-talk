import { Component, input } from '@angular/core';
import { CircleAvatarComponent } from '../../../../common-ui/circle-avatar/circle-avatar.component';
import { Comment } from '../../../../data/interfaces/post.interface';
import { TimeAgoPipe } from '../../../../helpers/pipes/time-ago.pipe';

@Component({
  selector: 'app-single-comment',
  standalone: true,
  imports: [CircleAvatarComponent, TimeAgoPipe],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.scss',
})
export class SingleCommentComponent {
  comment = input<Comment>();
}
