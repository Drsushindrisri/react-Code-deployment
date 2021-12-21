export function getDaysInMonth(month) {
  const newDate = new Date();
  const newMonth = newDate.getMonth();
  const newYear = newDate.getFullYear();
  const year = month < newMonth ? newYear + 1 : newYear;
  const today = month === newMonth ? newDate.getDate() : 1;
  const date = new Date(year, month, today);
  let days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
