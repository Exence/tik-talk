import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Token } from './auth.interfaces';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  accessToken: string | null = null
  refreshToken: string | null = null

  cookieService = inject(CookieService)
  router = inject(Router)

  isAuth() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('accessToken')
      this.refreshToken = this.cookieService.get('refreshToken')
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
        this.saveTokens(token)
      })
    )
  }

  getRefreshedToken() {
    return this.httpClient.post<Token>(
      `${this.baseExternalUrl}/refresh`,
      {refresh_token: this.refreshToken}
    ).pipe(
      tap(token => {
        this.saveTokens(token)
      }),
      catchError((err) => {
        this.logout()
        return throwError(err)
      })
    )
  }

  saveTokens(token: Token) {
    this.accessToken = token.access_token
    this.refreshToken = token.refresh_token

    this.cookieService.set('accessToken', token.access_token)
    this.cookieService.set('refreshToken', token.refresh_token)
  }

  logout(){
    this.accessToken = null
    this.refreshToken = null

    this.cookieService.delete('accessToken')
    this.cookieService.delete('refreshToken')
    this.router.navigate(['/login'])
  }
}
