const getDiffInDays = (iso1, iso2) => {
  const date1 = iso1; // this is start date
  const date2 = iso2; // end date

  const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000;

  const diffInMilliseconds =
    new Date(date2).getTime() - new Date(date1).getTime();
  const diffInDays = diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS;
  return diffInDays;
};

module.exports = {
  getDiffInDays,
};
