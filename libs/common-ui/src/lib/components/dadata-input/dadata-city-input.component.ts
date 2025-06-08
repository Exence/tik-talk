import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, forwardRef, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms'
import { DadataService } from '@tt/data-access'
import { BehaviorSubject, debounceTime, switchMap, tap } from 'rxjs'

@Component({
  selector: 'tt-dadata-city-input',
  templateUrl: './dadata-city-input.component.html',
  styleUrl: './dadata-city-input.component.scss',
  imports: [AsyncPipe, ReactiveFormsModule],
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
  #dadataService = inject(DadataService)

  readonly disabled = signal(false)

  readonly suggestions$ = new BehaviorSubject<string[]>([])

  readonly addresInput = new FormControl('')

  constructor() {
    this.addresInput.valueChanges
      .pipe(
        debounceTime(500),
        tap((city) => this.onChange(city ?? '')),
        switchMap((city) => this.#dadataService.getAddresSuggestions(city)),
        tap((res) => {
          const citiesWithTypes = res.map((address) => address.city_with_type).filter((c) => c)
          this.suggestions$.next(Array.from(new Set(citiesWithTypes)))
        }),
        takeUntilDestroyed()
      )
      .subscribe()
  }

  writeValue(city: string | null) {
    this.addresInput.setValue(city ?? '', { emitEvent: false })
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

  onSelectCity(city: string) {
    this.suggestions$.next([])
    this.addresInput.setValue(city, { emitEvent: false })
    this.onChange(city)
  }
}
