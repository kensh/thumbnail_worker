const imagemagick = require('imagemagick');

const path = require('path');
const dir = path.join(__dirname, 'upload/');

const convert = (file) => {
  imagemagick.convert([dir + file, '-resize', '100x100', dir + 'thumbnail_' + file], (err, stdout) => {
    if (err) throw err;
    console.log('stdout:', stdout);
  });
};

exports.convert = convert;
