import { Component, inject, Renderer2 } from '@angular/core';
import { CircleAvatarComponent } from "../../../common-ui/circle-avatar/circle-avatar.component";
import { ProfileService } from '../../../data/services/profile.service';
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [CircleAvatarComponent, SvgIconComponent],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  avatarUrl = inject(ProfileService).me()?.avatarUrl ?? ''
  r2 = inject(Renderer2)

  onTextareaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }
}
