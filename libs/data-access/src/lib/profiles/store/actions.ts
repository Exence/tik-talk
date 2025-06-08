import { createActionGroup, props } from '@ngrx/store'
import { Profile } from '../interfaces/profile.interface'
import { Pagination } from './reducer'

export const profileActions = createActionGroup({
  source: 'profiles',
  events: {
    'filter profiles': props<{ filters: Record<string, any> }>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
    'save filters': props<{ filters: Record<string, any> }>(),
    'set pagination': props<{ pagination: Pagination }>(),
    'set page': props<{ page?: number }>(),
    'set size': props<{ size: number }>()
  }
})
