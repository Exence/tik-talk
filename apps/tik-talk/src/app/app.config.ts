import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { authTokenInterceptor } from '@tt/auth'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideStore(),
    provideEffects()
  ]
}
