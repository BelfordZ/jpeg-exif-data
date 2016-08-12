const async = require('async');
const _ = require('underscore');
var ExifImage = require('exif').ExifImage;

const convertDMSToDD = (gps, direction) => {
  let degrees = gps[0];
  let minutes = gps[1]
  let seconds = gps[2];

  var dd = degrees + minutes / 60 + seconds / (60 * 60);

  if (direction == "S" || direction == "W") {
    dd = dd * -1;
  }
  return dd;
};


module.exports = (imagePaths, cb) => {
  var flow = imagePaths.map((imagePath) => (_cb) => {
    try {
      new ExifImage({ image : imagePath }, function (err, exifData) {
        return _cb(null, { exif: exifData, file: imagePath });
      });
    } catch (error) {
      return _cb(error);
    }
  });

  async.parallel(flow, (err, exifData) => {
    var gpsData = _.chain(exifData)
          .filter((exif) => _.isObject(exif.exif) && _.keys(exif.exif.gps).length)
          .map((exif) => {
            return {
              lat: convertDMSToDD(exif.exif.gps.GPSLatitude, exif.exif.gps.GPSLatitudeRef),
              long: convertDMSToDD(exif.exif.gps.GPSLongitude, exif.exif.gps.GPSLongitudeRef),
              file: exif.file
            };
          })
          .value();

    return cb(err, gpsData);
  });
};
