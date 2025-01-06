import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { profileActions } from '@tt/profiles';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent {
  fb = inject(FormBuilder);
  store$ = inject(Store)

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        takeUntilDestroyed(),
        startWith({}),
        debounceTime(300)
      )
      .subscribe(
        (formValue) => this.store$.dispatch(profileActions.filterProfiles({ filters: formValue }))
      );
  }
}
