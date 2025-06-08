import { createFeature, createReducer, on } from '@ngrx/store'
import { Profile } from '../interfaces'
import { profileActions } from './actions'

export interface ProfileState {
  profiles: Profile[]
  profileFilters: Record<string, any>
  pagination: Pagination
}

export interface Pagination {
  page: number
  size: number
}

const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
  pagination: {
    page: 1,
    size: 10
  }
}

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.filterProfiles, (state: ProfileState, payload) => {
      return {
        ...state,
        profiles: [],
        profileFilters: payload.filters,
        pagination: {
          ...state.pagination,
          page: 1
        }
      }
    }),
    on(profileActions.profilesLoaded, (state: ProfileState, payload) => {
      return {
        ...state,
        profiles: state.profiles.concat(payload.profiles)
      }
    }),
    on(profileActions.saveFilters, (state: ProfileState, payload) => {
      return {
        ...state,
        profileFilters: payload.filters
      }
    }),
    on(profileActions.setPagination, (state: ProfileState, payload) => {
      return {
        ...state,
        pagination: payload.pagination
      }
    }),
    on(profileActions.setPage, (state: ProfileState, payload) => {
      const page = payload.page ?? state.pagination.page + 1

      return {
        ...state,
        pagination: {
          ...state.pagination,
          page
        }
      }
    }),
    on(profileActions.setSize, (state: ProfileState, payload) => {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          size: payload.size
        }
      }
    })
  )
})
