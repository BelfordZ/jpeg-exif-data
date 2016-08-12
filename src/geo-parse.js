const async = require('async');
var findImages = require('./find-images.js');
var parseImageEXIF = require('./parse-image-exif.js');
var formatter = require('./formatter.js');
const fs = require('fs');

module.exports = (opts, cb) => {
  console.log(opts);
  let flow = [];

  flow.push((cb) => findImages(opts.inputPaths, cb));
  flow.push((imagePaths, cb) => parseImageEXIF(imagePaths, cb));
  flow.push((gpsData, cb) => formatter(opts.outputFormat, gpsData, cb));
  flow.push((formattedGpsData) => fs.writeFile(opts.outputPath, formattedGpsData, 'utf8', cb));

  async.waterfall(flow, (err, result) => {
    console.log('done', err, result);
  });
};

