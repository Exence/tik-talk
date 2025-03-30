import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'tt-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'tik-talk'
}
