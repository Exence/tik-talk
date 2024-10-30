import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import {
  BehaviorSubject,
  catchError,
  filter,
  firstValueFrom,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';

const isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (!authService.accessToken || req.url.includes('refresh')) {
    return next(req);
  }

  return next(addAuthHeaders(req, authService.accessToken)).pipe(
    catchError((err) => {
      if (isRefreshing$.value && err.status === 403) {
        return isRefreshing$.pipe(
          filter((isRefreshing) => !isRefreshing),
          switchMap(() => {
            return next(addAuthHeaders(req, authService.accessToken));
          })
        );
      }

      if (err.status === 403) {
        isRefreshing$.next(true);
        return authService.getRefreshedToken().pipe(
          switchMap((res) => {
            return next(addAuthHeaders(req, res.access_token)).pipe(
              tap(() => {
                isRefreshing$.next(false);
              })
            );
          })
        );
      }

      return throwError(err);
    })
  );
};

const addAuthHeaders = (req: HttpRequest<any>, accessToken: string | null) => {
  if (accessToken) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return req;
};
