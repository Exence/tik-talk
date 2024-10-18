export function timeAgo(date: Date) {
  const now = new Date();
  const diff = Math.abs(now.getTime() - date.getTime()) / 1000; 

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) {
      return 'только что';
  } else if (minutes < 60) {
      return `${minutes} минут назад`;
  } else if (hours < 24) {
      return `${hours} ${getPlural(hours, ' час', ' часа', ' часов')} назад`;
  } else {
      return `${days} ${getPlural(days, ' день', ' дня', ' дней')} назад`;
  }
}


function getPlural(number: number, one: string, two: string, five: string) {
  if (number % 10 === 1 && number % 100 !== 11) {
      return one;
  } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
      return two;
  } else {
      return five;
  }
}
