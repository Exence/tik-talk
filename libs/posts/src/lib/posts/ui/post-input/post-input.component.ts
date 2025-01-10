import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CircleAvatarComponent, SvgIconComponent } from '@tt/common-ui';
import { ProfileService } from '@tt/profiles';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [FormsModule, CircleAvatarComponent, SvgIconComponent],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  @Input() palaceholder = '';
  @Input() isCommentInput = false;
  @Output() send: EventEmitter<string> = new EventEmitter<string>();

  me = inject(ProfileService).me();
  avatarUrl = this.me?.avatarUrl ?? '';
  content = '';
  #r2 = inject(Renderer2);

  @HostBinding('class.comment-input')
  get isComment() {
    return this.isCommentInput;
  }

  onTextareaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.#r2.setStyle(textarea, 'height', 'auto');
    this.#r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onSend() {
    if (!this.content) return;

    this.send.emit(this.content);

    this.content = '';
  }
}
