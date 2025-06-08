import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms'
import { tap } from 'rxjs'

@Component({
  selector: 'tt-dadata-city-input',
  templateUrl: './dadata-city-input.component.html',
  styleUrl: './dadata-city-input.component.scss',
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DadataCityInputComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DadataCityInputComponent implements ControlValueAccessor {
  readonly disabled = signal(false)

  readonly addresInput = new FormControl('')

  constructor() {
    this.addresInput.valueChanges
      .pipe(
        takeUntilDestroyed(),
        tap((city) => this.onChange(city ?? ''))
      )
      .subscribe()
  }

  writeValue(city: string | null) {
    this.addresInput.setValue(city ?? '')
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

  onChange(city: string) {}

  onTouched() {}
}
