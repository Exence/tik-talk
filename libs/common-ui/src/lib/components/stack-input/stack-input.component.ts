import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SvgIconComponent } from '../../svg-icon/svg-icon.component'

@Component({
  selector: 'tt-stack-input',
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  imports: [FormsModule, SvgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class StackInputComponent {
  readonly stack = signal<string[]>([])
  skillInputValue = ''

  @HostListener('keydown.enter')
  onEnterSkill() {
    if (!this.skillInputValue.length) return

    const stack = this.stack()
    stack.push(this.skillInputValue)
    this.stack.set(stack)
    this.skillInputValue = ''
  }

  onDeleteSkill(index: number) {
    const stack = this.stack()
    stack.splice(index, 1)
    this.stack.set(stack)
  }
}
