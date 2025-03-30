import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs'
import { ProfileService } from '../services/profile.service'
import { profileActions } from './actions'

@Injectable({
  providedIn: 'root'
})
export class ProfileEffects {
  actions$ = inject(Actions)
  profileService = inject(ProfileService)

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterProfiles),
      switchMap(({ filters }) => {
        return this.profileService.getFilteredAccounts(filters)
      }),
      map((res) => profileActions.profilesLoaded({ profiles: res.items }))
    )
  })
}
