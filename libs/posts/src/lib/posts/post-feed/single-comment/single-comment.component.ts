import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { CircleAvatarComponent } from '@tt/common-ui'
import { Comment } from '@tt/data-access'
import { TimeAgoPipe } from '@tt/shared'

@Component({
  selector: 'tt-single-comment',
  standalone: true,
  imports: [CircleAvatarComponent, TimeAgoPipe],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCommentComponent {
  comment = input<Comment>()
}
