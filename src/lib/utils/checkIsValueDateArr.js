export const checkIsValueDateArr = (date) => {
  let dateRange;
  if (Array.isArray(date)) {
    dateRange = `${date[0]}, ${date[1]}`;
  } else {
    dateRange = date;
  }

  return dateRange;
};
