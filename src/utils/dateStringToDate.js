export const dateStringToDate = (dateString) => {
  const values = dateString.split(" ")[0].split("-");
  const year = values[0];
  const month = values[1];
  const day = values[2];

  const date = new Date(year, month - 1, day);

  return date;
};
