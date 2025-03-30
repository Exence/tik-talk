import { createActionGroup, props } from '@ngrx/store'
import { Profile } from '@tt/common-interfaces/profile'

export const profileActions = createActionGroup({
  source: 'profiles',
  events: {
    'filter profiles': props<{ filters: Record<string, any> }>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
    'save filters': props<{ filters: Record<string, any> }>()
  }
})
