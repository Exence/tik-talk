import { ChangeDetectionStrategy, Component, ViewChild, effect, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { DadataCityInputComponent, StackInputComponent } from '@tt/common-ui'
import { ProfileService } from '@tt/data-access'
import { ProfileHeaderComponent } from '@tt/profiles'
import { firstValueFrom } from 'rxjs'
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component'

@Component({
  selector: 'tt-settings-page',
  standalone: true,
  imports: [
    AvatarUploadComponent,
    DadataCityInputComponent,
    ReactiveFormsModule,
    ProfileHeaderComponent,
    StackInputComponent
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)
  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

  settingsForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: '',
    stack: [''],
    city: ''
  })

  constructor() {
    effect(() => {
      //@ts-ignore
      this.settingsForm.patchValue(this.profileService.me())
    })
  }

  onSave() {
    this.settingsForm.markAllAsTouched()
    this.settingsForm.updateValueAndValidity()

    if (this.settingsForm.invalid) return
    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile(this.settingsForm.value))
    this.onAvatarUpload(this.avatarUploader.avatar)
  }

  onAvatarUpload(file: File | null) {
    if (!file || !file.type.match('image')) return

    firstValueFrom(this.profileService.uploadAvatar(file))
  }
}
