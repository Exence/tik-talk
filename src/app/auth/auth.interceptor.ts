import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { BehaviorSubject, catchError, filter, switchMap, tap, throwError } from "rxjs";

let isRefreshing$ = new BehaviorSubject<boolean>(false)

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const accessToken = authService.accessToken
 
  if (!accessToken || req.url.includes('refresh')) {
    return next(req)
  } 

  if (isRefreshing$.value) {
    isRefreshing$.pipe(
      filter(isRefreshing => !isRefreshing),
      switchMap(res =>{
        return next(addAuthHeaders(req, accessToken))
      })
    )
  }

  return next(addAuthHeaders(req, accessToken)).pipe(
    catchError(err => {
      if (err.status === 403) {
        isRefreshing$.next(true)
        return authService.getRefreshedToken().pipe(
          switchMap((res) => {
            return next(addAuthHeaders(req, res.access_token)).pipe(
              tap(() => {isRefreshing$.next(false)})
            )
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
