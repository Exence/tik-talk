import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.inerface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/account'
  me = signal<Profile | null>(null)

  constructor() { }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/test_accounts`)
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}/me`).pipe(
      tap(res => this.me.set(res))
    )
  }

  getAccountById(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}/${id}`)
  }

  getSubscribersShortList(maxCount: number = 3) {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}/subscribers/`).pipe(
      map(res => res.items.slice(0,maxCount))
    )
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch(`${this.baseApiUrl}/me`,
      profile
    )
  }

  uploadAvatar(avatar: File) {
    const fd = new FormData()
    fd.append('image', avatar);

    return this.http.post(`${this.baseApiUrl}/upload_image`,
      fd
    )
  }
}
