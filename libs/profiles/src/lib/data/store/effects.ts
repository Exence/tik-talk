import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, switchMap, withLatestFrom } from 'rxjs'
import { ProfileService } from '../services/profile.service'
import { profileActions } from './actions'
import { selectPagination, selectSavedFilters } from './selectors'

@Injectable({
  providedIn: 'root'
})
export class ProfileEffects {
  #actions$ = inject(Actions)
  #profileService = inject(ProfileService)
  #store = inject(Store)

  filterProfiles = createEffect(() => {
    return this.#actions$.pipe(
      ofType(profileActions.filterProfiles, profileActions.setPage),
      withLatestFrom(this.#store.select(selectSavedFilters), this.#store.select(selectPagination)),
      switchMap(([_, filters, pagination]) => {
        return this.#profileService.getFilteredAccounts({ ...filters, ...pagination })
      }),
      map((res) => profileActions.profilesLoaded({ profiles: res.items }))
    )
  })
}
