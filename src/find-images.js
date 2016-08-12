const glob = require('glob');

const isImageExtension = (file) => {
  return /.jpeg$|.jpg$/.test(file)
};

module.exports = (dir, cb) => {
  glob(dir, (err, files) => {
    if (err) { return cb(err, null); }

    return cb(null, files.filter(isImageExtension));
  });
};
