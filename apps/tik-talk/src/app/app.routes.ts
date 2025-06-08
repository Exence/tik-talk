import { Routes } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideState } from '@ngrx/store'
import { canActivateAuth } from '@tt/auth'
import { PostEffects, postFeature } from '@tt/data-access'
import { ProfileEffects, profileFeature } from '@tt/profiles'
import { LayoutComponent } from '@tt/sidebar'
import { ChatsPageRoutes } from './pages/chats-page/chats-page.routes'
import { ExperementPageComponent } from './pages/experements/experement.component'
import { LoginPageComponent } from './pages/login-page/login-page.component'
import { ProfilePageComponent } from './pages/profile-page/profile-page.component'
import { SearchPageComponent } from './pages/search-page/search-page.component'
import { SettingsPageComponent } from './pages/settings-page/settings-page.component'

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
        providers: [provideState(postFeature), provideEffects(PostEffects)]
      },
      { path: 'settings', component: SettingsPageComponent },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [provideState(profileFeature), provideEffects(ProfileEffects)]
      },
      { path: 'chats', loadChildren: () => ChatsPageRoutes }
    ],
    canActivate: [canActivateAuth]
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'experements', component: ExperementPageComponent }
]
