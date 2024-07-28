import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = inject(AuthService).accessToken
  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
  return next(req)
}