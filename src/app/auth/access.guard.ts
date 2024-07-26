import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { Router } from "@angular/router"

export const canActivateAuth = () => {
  const isLoggedIn = inject(AuthService).isAuth()

  return isLoggedIn ? true : inject(Router).createUrlTree(['/login'])
}
