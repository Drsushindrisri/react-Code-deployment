export function getDaysInMonth(month) {
  if (month < new Date().getMonth()) return [];
  const today = month === new Date().getMonth() ? new Date().getDate() : 1;
  const date = new Date(new Date().getFullYear(), month, today);
  let days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
