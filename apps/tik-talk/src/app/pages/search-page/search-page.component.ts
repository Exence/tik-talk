import { Component, inject } from '@angular/core';
import { ProfileFiltersComponent } from './profile-filters/profile-filters.component';
import { ProfileService, ProfileCardComponent } from '@tt/profiles';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;
}
