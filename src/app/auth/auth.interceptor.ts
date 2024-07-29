import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, switchMap, throwError } from "rxjs";

let isRefreshing = false

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const accessToken = authService.accessToken
 
  if (!accessToken || isRefreshing) {
    isRefreshing = false
    return next(req)
  } 

  return next(addAuthHeaders(req, accessToken)).pipe(
    catchError(err => {
      if (err.status === 403) {
        return authService.getRefreshedToken().pipe(
          switchMap((res) => {
            return next(addAuthHeaders(req, res.access_token))
          })
        )
      }
      return throwError(err) 
    })
  )
}

const addAuthHeaders = (req: HttpRequest<any>, accessToken: string | null) => {
  if (accessToken) {
    return req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      })
  }
  return req
}
