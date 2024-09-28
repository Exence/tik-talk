import { Component, effect, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ReactiveFormsModule, ProfileHeaderComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)

  settingsForm = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: [{value: '', disabled: true }, Validators.required],
      description: [''],
      stack: [''],
    }
  )

  constructor(){
    effect(() => {
      //@ts-ignore
        this.settingsForm.patchValue(this.profileService.me())
      }
    )
  }

  onSave(){
    this.settingsForm.markAllAsTouched()
    this.settingsForm.updateValueAndValidity()

    if (this.settingsForm.valid) {
      //@ts-ignore
      firstValueFrom(this.profileService.patchProfile(this.settingsForm.value))
    }
  }
}
