import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SvgIconComponent } from "../../svg-icon/svg-icon.component";

@Component({
  selector: 'tt-stack-input',
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  imports: [SvgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class StackInputComponent {
  readonly stack = signal<string[]>([])
}
