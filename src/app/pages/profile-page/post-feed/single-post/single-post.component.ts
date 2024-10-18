import { Component, Input } from '@angular/core';
import { Post } from '../../../../data/interfaces/post.interface';
import { CircleAvatarComponent } from "../../../../common-ui/circle-avatar/circle-avatar.component";
import { timeAgo } from '../../../../helpers/time-ago';
import { SvgIconComponent } from '../../../../common-ui/svg-icon/svg-icon.component';
import { PostInputComponent } from "../../../../common-ui/post-input/post-input.component";

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [CircleAvatarComponent, SvgIconComponent, PostInputComponent],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss'
})
export class SinglePostComponent {
  @Input() post!: Post

  getCreateOrUpdatePostDateString(){
    const createDate = new Date(this.post.createdAt)
    const updatedDate = new Date(this.post.updatedAt?? '01 Jan 1970 00:00:00 GMT')

    return updatedDate > createDate ? `Отредактировано ${timeAgo(updatedDate)}` : timeAgo(updatedDate)
  }
}
