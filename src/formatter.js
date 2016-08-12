var _ = require('underscore');
var ejs = require('ejs');

const csvFormat = (gpsData) => {
  let csvString = _.chain(gpsData)
        .map((data) => {
          return _.keys(data);
        })
        .flatten()
        .unique()
        .value()
        .join(',') + '\n';

  csvString += _.chain(gpsData)
    .map(_.values)
    .map((data) => data.join(','))
    .value()
    .join('\n');

  return csvString
};

const htmlFormat = (gpsData, cb) => {
  ejs.renderFile('./src/html-format.ejs', { items: gpsData }, {}, cb);
};

module.exports = (format, gpsData, cb) => {
  if (format === 'html') return htmlFormat(gpsData, cb);

  cb(null, csvFormat(gpsData));
};
