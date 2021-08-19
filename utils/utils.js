exports.createRoute = (arrayOfPairs) => {
  const result = [];

  // Creates all lines:
  for (let i = 0; i < arrayOfPairs.length; i += 1) {
    // Creates an empty line
    result.push([]);

    // Adds cols to the empty line:
    result[i].push(new Array(2));

    for (let j = 0; j < 2; j += 1) {
      // Initializes:
      if (j === 0) {
        result[i][j] = arrayOfPairs[i].first;
      } else {
        result[i][j] = arrayOfPairs[i].second;
      }
    }
  }
  return result;
};
exports.createDate = (time) => {
  const date = new Date();
  const splitTime = time.split(':');
  date.setHours(splitTime[0]);
  date.setMinutes(splitTime[1]);
  date.setSeconds(splitTime[2].split('.')[0]);

  return date;
};
exports.createDateFromTimeAndDate = (date, time) => {
  const result = new Date();
  const splitDate = date.split('/');
  result.setFullYear(splitDate[2]);
  result.setMonth(splitDate[1] * 1 - 1);
  result.setDate(splitDate[0]);

  const spiltTime = time.split(':');
  result.setHours(spiltTime[0] * 1 + 3);
  result.setMinutes(spiltTime[1]);
  result.setSeconds(0);

  return result;
};
