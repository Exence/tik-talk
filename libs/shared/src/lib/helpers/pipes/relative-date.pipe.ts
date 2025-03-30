import { Pipe, PipeTransform } from '@angular/core'
import { DateTime } from 'luxon'

@Pipe({
  name: 'relativeDatePipe',
  standalone: true
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: string | Date | number, format = 'dd.MM.yyyy'): string {
    if (!value) return ''

    const date = DateTime.fromISO(new Date(value).toISOString())
    const today = DateTime.local().startOf('day')
    const yesterday = today.minus({ days: 1 })
    const aWeekAgo = today.minus({ days: 6 })
    const weekday = date.setLocale(navigator.language).toLocaleString({ weekday: 'long' })

    switch (true) {
      case date >= today:
        return 'сегодня'

      case date >= yesterday:
        return 'вчера'

      case date >= aWeekAgo:
        return `${weekday} ${date.toFormat('dd.MM')}`

      default:
        return date.toFormat(format)
    }
  }
}
