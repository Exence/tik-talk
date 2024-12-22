import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'addTimezonePipe',
  standalone: true
})
export class AddTimezonePipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return '';

    return DateTime.fromISO(value, { zone: 'UTC' }).toLocal().toISO()?? '';
  }
}
