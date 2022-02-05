export const dateFormat = (date) => {
  var datePart = date.match(/\d+/g),
    year = datePart[0],
    month = datePart[1],
    day = datePart[2];

  return year + "-" + month + "-" + day;
};
