import { Component, EventEmitter, inject, Input, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CircleAvatarComponent } from '../circle-avatar/circle-avatar.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ProfileService } from '../../data/services/profile.service';
import { PostService } from '../../data/services/post.service';
import { PostCreateDto } from '../../data/interfaces/post.interface';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [FormsModule, CircleAvatarComponent, SvgIconComponent],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  @Input() palaceholder = ''
  @Output() send: EventEmitter<string> = new EventEmitter<string>()

  me = inject(ProfileService).me() 
  avatarUrl = this.me?.avatarUrl ?? ''
  content = ''
  #r2 = inject(Renderer2)

  onTextareaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
    this.#r2.setStyle(textarea, 'height', 'auto')
    this.#r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  onSend() {
    if (!this.content) return

    this.send.emit(this.content)
  }
}
