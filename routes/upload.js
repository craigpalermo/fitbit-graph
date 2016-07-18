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

/* POST file upload */
router.post('/activities', upload.single('file'), function(req, res) {
  const uploadPath = path.join(appDir, req.file.path);
  let lines = [];

  // Setup line reader
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(uploadPath),
  });

  // Read file line-by-line
  lineReader.on('line', function (line) {
    // Only process data lines that start with a date
    if (/\d{4}-\d{2}-\d{2}/.test(line)) {
      parse(line, {}, (err, output) => {
        if (!!output[0]) {
          lines.push(output[0]);
        }
      });
    }
  });

  // Send a response once all lines have been processed
  lineReader.on('close', function () {
    // Convert arrays of line data to objects
    lines = unflatten(lines);

    res.send(lines);
  });
});

module.exports = router;
