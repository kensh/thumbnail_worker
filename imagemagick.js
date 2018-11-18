const imagemagick = require('imagemagick');

const path = require('path');
const dir = path.join(__dirname, 'upload/');

const convert = (filename) => {
  imagemagick.convert([dir + filename, '-resize', '100x100', dir + 'thumbnail_' + filename + ".png"], (err, stdout) => {
    if (err) throw err;
    console.log('stdout:', stdout);
  });
};

exports.convert = convert;
