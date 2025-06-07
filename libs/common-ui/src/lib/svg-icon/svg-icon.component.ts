import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href] = "href"></svg:use>',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent {
  @Input() icon = ''

  get href() {
    console.log(`/assets/svg/${this.icon}.svg#${this.icon}`);
    
    return `/assets/svg/${this.icon}.svg#${this.icon}`
  }
}
