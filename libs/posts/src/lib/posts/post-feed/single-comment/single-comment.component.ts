import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { CircleAvatarComponent } from '@tt/common-ui'
import { TimeAgoPipe } from '@tt/shared'
import { Comment } from '../../data/interfaces/post.interface'

@Component({
  selector: 'app-single-comment',
  standalone: true,
  imports: [CircleAvatarComponent, TimeAgoPipe],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCommentComponent {
  comment = input<Comment>()
}
