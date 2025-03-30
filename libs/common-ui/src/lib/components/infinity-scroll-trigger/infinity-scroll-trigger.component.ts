import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core'

@Component({
  selector: 'tt-infinity-scroll-trigger',
  standalone: true,
  imports: [],
  templateUrl: './infinity-scroll-trigger.component.html',
  styleUrl: './infinity-scroll-trigger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfinityScrollTriggerComponent implements OnInit {
  readonly loaded = output()

  ngOnInit(): void {
    this.loaded.emit()
  }
}
