import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'

export const canActivateAuth = () => {
  const isLoggedIn = inject(AuthService).isAuth()

  return isLoggedIn ? true : inject(Router).createUrlTree(['/login'])
}
