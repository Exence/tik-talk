import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: '[theGreatest]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: TheGreatestValidator,
      multi: true
    }
  ]
})
export class TheGreatestValidator implements Validator{
  change!: () => void
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null

    return control.value.toLowerCase() === 'мансуров'
    ? {theGreatest: { message: 'Только великий может носить эту фамилию. Убедитесь, что Вы великий' }}
    : null
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.change = fn;
  }

}