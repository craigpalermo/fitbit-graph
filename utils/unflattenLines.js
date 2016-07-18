const parseCommaInt = require('../utils/parseCommaInt');

/**
 * Converts each array in the lines array to an object using the fields
 * in the activies export that correspond to each item in the arrays.
 * @param lines
 */
module.exports = (lines) => {
  return lines.map(line => ({
    date: line[0],
    caloriesBurned: parseCommaInt(line[1]),
    steps: parseCommaInt(line[2]),
    distance: parseCommaInt(line[3]),
    floors: parseCommaInt(line[4]),
  }));
};