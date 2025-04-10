import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '@tt/auth'

@Component({
  selector: 'tt-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  authService = inject(AuthService)
  router = inject(Router)

  isPasswordVisible = signal<boolean>(false)

  onSubmit() {
    if (this.loginForm.valid) {
      //@ts-ignore
      this.authService.getAuthToken(this.loginForm.value).subscribe((res) => {
        this.router.navigate([''])
      })
    }
  }
}
