import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'tt-search-layout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search-layout.component.html',
  styleUrl: './search-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchLayoutComponent {}
