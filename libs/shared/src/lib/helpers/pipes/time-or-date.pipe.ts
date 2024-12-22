import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeOrDatePipe',
  standalone: true,
})
export class TimeOrDatePipe implements PipeTransform {
  formatDate = (date: Date) =>
    `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  transform(timestamp: string | null): string {
    if (!timestamp) return '';

    const now = new Date();
    const datetime = new Date(timestamp);

    const isSameDate = this.formatDate(now) === this.formatDate(datetime);

    return isSameDate ? this.formatTime(datetime) : this.formatDate(datetime);
  }
}
