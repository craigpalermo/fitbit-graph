const parseCommaInt = require('../utils/parseCommaInt');

/**
 * Functions in this module convert each line in a given array to an object, depending
 * on the export type (fields vary depending on type). All functions return an array
 * of objects.
 */

exports.activities = (lines) => {
  return lines.map(line => ({
    date: line[0],
    caloriesBurned: parseCommaInt(line[1]),
    steps: parseCommaInt(line[2]),
    distance: parseCommaInt(line[3]),
    floors: parseCommaInt(line[4]),
  }));
};

exports.body = (lines) => {
  return lines.map(line => ({
    date: line[0],
    weight: parseCommaInt(line[1]),
    bmi: parseCommaInt(line[2]),
    fat: parseCommaInt(line[3]),
  }));
};

exports.sleep = (lines) => {
  return lines.map(line => ({
    date: line[0],
    minutesAsleep: parseCommaInt(line[1]),
    minutesAwake: parseCommaInt(line[2]),
    numberOfAwakenings: parseCommaInt(line[3]),
    timeInBed: parseCommaInt(line[4]),
  }));
};