import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { Token } from './auth.interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  accessToken: string | null = null
  refreshToken: string | null = null
  cookieService = inject(CookieService)

  isAuth() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('accessToken')
    }
    return !!this.accessToken
  }

  private httpClient = inject(HttpClient)
  private baseExternalUrl = 'https://icherniakov.ru/yt-course/auth'

  getAuthToken(payload: {username: string, password: string}){
    const fd = new FormData()

    fd.append("username", payload.username)
    fd.append("password", payload.password)

    return this.httpClient.post<Token>(
      `${this.baseExternalUrl}/token`,
      fd,
    ).pipe(
      tap(token => {
        this.accessToken = token.access_token
        this.refreshToken = token.refresh_token

        this.cookieService.set('accessToken', token.access_token)
        this.cookieService.set('refreshToken', token.refresh_token)
      })
    )
  }
}