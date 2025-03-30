import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ProfileCardComponent } from '@tt/profiles'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ProfileCardComponent, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
