var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var parse = require('csv-parse');
var unflatten = require('../utils/unflattenLines');

// Set up Express router
var router = express.Router();

// Set up multer for file uploads
var upload = multer({ dest: 'uploads/' });

// Field names for each type of export
var exportTypes = {
  activities: [
    { field: 'caloriesBurned', displayName: 'Calories Burned' },
    { field: 'steps', displayName: 'Steps' },
    { field: 'distance', displayName: 'Distance' },
    { field: 'floors', displayName: 'Floors' },
  ],
  body: [
    { field: 'weight', displayName: 'Weight' },
    { field: 'bmi', displayName: 'BMI' },
    { field: 'fat', displayName: 'Fat' },
  ],
  sleep: [
    { field: 'minutesAsleep', displayName: 'Minutes Asleep' },
    { field: 'minutesAwake', displayName: 'Minutes Awake' },
    { field: 'numberOfAwakenings', displayName: 'Number of Awakenings' },
    { field: 'timeInBed', displayName: 'Time in Bed' },
  ],
};

/* POST file upload */
router.post('/activities', upload.single('file'), function(req, res) {
  const uploadPath = path.join(appDir, req.file.path);
  let lineNumber = 0;
  let exportType;
  let uploadFailed = false;
  let response = {
    lines: [],
  };

  // Setup line reader
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(uploadPath),
  });

  // Read file line-by-line
  lineReader.on('line', function (line) {
    // Get config data depending on type of export provided
    if (lineNumber === 0) {
      const match = /(activities|body|sleep)/ig.exec(line);

      if (match) {
        exportType = match[1].toLowerCase();
        response.chartConfig = exportTypes[exportType];
      } else {
        uploadFailed = true;
      }
    }

    // Only process data lines that start with a date
    if (!uploadFailed && /\d{4}-\d{2}-\d{2}/.test(line)) {
      parse(line, {}, (err, output) => {
        if (!!output[0]) {
          response.lines.push(output[0]);
        }
      });
    }

    lineNumber += 1;
  });

  // Send a response once all lines have been processed
  lineReader.on('close', function () {
    if (!uploadFailed) {
      // Convert arrays of line data to objects
      const unflattenFn = unflatten[exportType];
      response.lines = unflattenFn(response.lines);
      res.send(response);
    } else {
      res.status(400).end();
    }
  });
});

module.exports = router;
