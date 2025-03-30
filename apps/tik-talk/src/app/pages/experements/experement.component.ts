import { CommonModule, JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms'
import { MaskitoDirective } from '@maskito/angular'
import { phoneMaskOption } from './helpers/mask.options'
import { TheGreatestValidator } from './helpers/validators/the-greatest.validator'

enum Country {
  RU = 'Россия',
  USA = 'США',
  UK = 'Великобритания'
}

const getAdditionalContact = () => {
  return new FormGroup({
    name: new FormControl<string>(''),
    phone: new FormControl<string>('')
  })
}

const validatePhone: ValidatorFn = (control: AbstractControl) => {
  return control.value.includes('X')
    ? { validatePhone: { message: 'Введите корректный номер телефона' } }
    : null
}

@Component({
  selector: 'app-experement-page',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    TheGreatestValidator,
    CommonModule,
    ReactiveFormsModule,
    MaskitoDirective
  ],
  templateUrl: './experement-page.component.html',
  styleUrl: './experement-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperementPageComponent {
  // Template Form
  person = {
    firstName: '',
    lastName: '',
    address: {
      street: '',
      building: 0
    }
  }

  onChanges(value: string) {
    this.person.firstName = value
  }

  onTemplateSubmit(event: SubmitEvent) {
    //@ts-ignore
    console.log(window.ng.getDirectives(event.target)[2].value)
  }

  // Reactive Form
  readonly phoneMask = phoneMaskOption
  countries = Country
  initForm = {
    address: {
      country: Country.RU
    }
  }

  reactiveForm = new FormGroup({
    personalData: new FormGroup({
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      birthday: new FormControl<Date | null>(null, Validators.required)
    }),
    contacts: new FormGroup({
      email: new FormControl<string>('', Validators.required),
      phone: new FormControl<string>('', [Validators.required, validatePhone])
    }),
    address: new FormGroup({
      country: new FormControl<Country>(Country.RU, Validators.required),
      city: new FormControl<string>('', Validators.required),
      street: new FormControl<string>('', Validators.required),
      building: new FormControl<number | null>(null, Validators.required),
      apartment: new FormControl<number | null>(null, Validators.required)
    }),
    additionalContacts: new FormArray([getAdditionalContact()]),
    terms: new FormGroup({
      termsAccepted: new FormControl<boolean>(false)
    })
  })

  constructor() {
    this.reactiveForm.patchValue(this.initForm)
  }

  onReactiveSubmit() {
    //@ts-ignore
    console.log(this.reactiveForm.value)
    this.reactiveForm.markAllAsTouched()
    this.reactiveForm.updateValueAndValidity()
  }

  onReactiveReset() {
    this.reactiveForm.reset()
    this.reactiveForm.patchValue(this.initForm, { emitEvent: false })
  }

  onAddContact() {
    this.reactiveForm.controls.additionalContacts.push(getAdditionalContact())
  }

  onRemoveContact(index: number) {
    this.reactiveForm.controls.additionalContacts.removeAt(index, {
      emitEvent: false
    })
  }
}
