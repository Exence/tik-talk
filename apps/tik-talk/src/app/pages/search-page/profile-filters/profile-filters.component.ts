import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { profileActions, selectSavedFilters } from '@tt/profiles'
import { debounceTime, firstValueFrom, startWith } from 'rxjs'

@Component({
  selector: 'tt-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFiltersComponent implements OnInit {
  fb = inject(FormBuilder)
  store$ = inject(Store)

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: ['']
  })

  constructor() {
    this.searchForm.valueChanges
      .pipe(takeUntilDestroyed(), startWith({}), debounceTime(300))
      .subscribe((formValue) => {
        this.store$.dispatch(profileActions.filterProfiles({ filters: formValue }))
        this.store$.dispatch(profileActions.saveFilters({ filters: formValue }))
      })
  }

  async ngOnInit() {
    const savedFilters = await firstValueFrom(this.store$.select(selectSavedFilters))
    this.searchForm.patchValue(savedFilters)
  }
}
