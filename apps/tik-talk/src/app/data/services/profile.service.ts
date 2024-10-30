import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.inerface';
import { baseApiUrl } from '@tt/shared';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  accountApiUrl = `${baseApiUrl}/account`;
  me = signal<Profile | null>(null);
  filteredProfiles = signal<Profile[]>([]);

  constructor() {}

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.accountApiUrl}/test_accounts`);
  }

  getFilteredAccounts(params: Record<string, any>) {
    return this.http
      .get<Pageble<Profile>>(`${this.accountApiUrl}/accounts`, {
        params,
      })
      .pipe(
        tap((res) => {
          this.filteredProfiles.set(res.items);
        })
      );
  }

  getMe() {
    return this.http
      .get<Profile>(`${this.accountApiUrl}/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getAccountById(id: number) {
    return this.http.get<Profile>(`${this.accountApiUrl}/${id}`);
  }

  getSubscribersShortList(maxCount: number = 3) {
    return this.http
      .get<Pageble<Profile>>(`${this.accountApiUrl}/subscribers/`)
      .pipe(map((res) => res.items.slice(0, maxCount)));
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch(`${this.accountApiUrl}/me`, profile);
  }

  uploadAvatar(avatar: File) {
    const fd = new FormData();
    fd.append('image', avatar);

    return this.http.post(`${this.accountApiUrl}/upload_image`, fd);
  }
}
