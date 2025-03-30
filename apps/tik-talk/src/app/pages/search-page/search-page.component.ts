import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { InfinityScrollTriggerComponent } from '@tt/common-ui'
import { profileActions, ProfileCardComponent, selectFilteredProfiles } from '@tt/profiles'
import { ProfileFiltersComponent } from './profile-filters/profile-filters.component'

@Component({
  selector: 'tt-search-page',
  standalone: true,
  imports: [InfinityScrollTriggerComponent, ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {
  store$ = inject(Store)

  profiles = this.store$.selectSignal(selectFilteredProfiles)

  fetchNextProfilePage() {
    this.store$.dispatch(profileActions.setPage({}))
  }
}
