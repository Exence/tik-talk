import { createFeature, createReducer, on } from '@ngrx/store'
import { Profile } from '@tt/common-interfaces/profile'
import { profileActions } from './actions'

export interface ProfileState {
  profiles: Profile[]
  profileFilters: Record<string, any>
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {}
}

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profilesLoaded, (state: ProfileState, payload) => {
      return {
        ...state,
        profiles: payload.profiles
      }
    }),
    on(profileActions.saveFilters, (state: ProfileState, payload) => {
      return {
        ...state,
        profileFilters: payload.filters
      }
    })
  )
})
