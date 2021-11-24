export function getDaysInMonth(month) {
  if (month < new Date().getMonth()) return [];
  const date = new Date(new Date().getFullYear(), month, new Date().getDate());
  let days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
