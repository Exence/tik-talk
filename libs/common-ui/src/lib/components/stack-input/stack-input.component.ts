import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, forwardRef, HostListener, signal } from '@angular/core'
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'
import { SvgIconComponent } from '../../svg-icon/svg-icon.component'

@Component({
  selector: 'tt-stack-input',
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  imports: [AsyncPipe, FormsModule, SvgIconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StackInputComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class StackInputComponent implements ControlValueAccessor {
  readonly disabled = signal(false)

  readonly value$ = new BehaviorSubject<string[]>([])
  skillInputValue = ''

  @HostListener('keydown.enter', ['$event'])
  onEnterSkill(event: KeyboardEvent) {
    event.stopPropagation()
    event.preventDefault()

    if (!this.skillInputValue.length) return

    this.value$.next([...this.value$.value, this.skillInputValue])
    this.skillInputValue = ''

    this.onChange(this.value$.value)
  }

  onDeleteSkill(index: number) {
    if (this.disabled()) return

    const value = this.value$.value
    value.splice(index, 1)
    this.value$.next(value)

    this.onChange(this.value$.value)
  }

  writeValue(val: string[]) {
    if (!val) {
      this.value$.next([])
      return
    }
    this.value$.next(val)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }

  onChange(val: string[] | null) {}

  onTouched() {}
}
