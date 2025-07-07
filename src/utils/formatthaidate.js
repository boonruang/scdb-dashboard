import { format, isValid } from 'date-fns';
import { th } from 'date-fns/locale';

export function formatThaiDateBuddhistEra(date) {
  const d = new Date(date);
  if (!isValid(d)) return '-';
  const formatted = format(d, 'd MMMM yyyy', { locale: th });
  const [day, month, year] = formatted.split(' ');
  const buddhistYear = (parseInt(year, 10) + 543).toString();
  return `${day} ${month} ${buddhistYear}`;
}