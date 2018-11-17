const imagemagick = require('imagemagick');

const convert = (from, to) => {
  imagemagick.convert([from, '-resize', '100x100', to], (err, stdout) => {
    if (err) throw err;
    console.log('stdout:', stdout);
  });
};

exports.convert = convert;
