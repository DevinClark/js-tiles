
const path = require('path');

module.exports = {
  entry: './map.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'map.js'
  }
};