import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'tt-dadata-input',
  templateUrl: './dadata-input.component.html',
  styleUrl: './dadata-input.component.scss',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DadataInputComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DadataInputComponent implements ControlValueAccessor {
  readonly disabled = signal(false)

  writeValue(val: any) {}

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }

  onChange(val: any) {}

  onTouched() {}
}
