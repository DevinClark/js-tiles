const fs = require('fs');
const Promise = require('bluebird');
const geojsonvt = require('geojson-vt');
const vtpbf = require('vt-pbf');
const mkdirp = require('mkdirp-promise');
const generateTileJSON = require('./generate-tilejson');

Promise.promisifyAll(fs);

module.exports = function generateTiles(geojson, productName) {
  var maxZoom = 13;
  var tileIndex = geojsonvt(geojson, {
    maxZoom: maxZoom,
    tolerance: 3,
    extent: 4096,
    buffer: 64,
    debug: 2,

    indexMaxZoom: maxZoom,
    indexMaxPoints: 0,
    solidChildren: false
  });

  return Promise.map(tileIndex.tileCoords, function ({z, y, x}) {
    var tile = tileIndex.getTile(z, x, y);

    // we don't need empty tiles
    if (tile.numFeatures > 0) {
      return mkdirp(`./${productName}/${z}/${y}`).then(function (created) {
        var buff = vtpbf.fromGeojsonVt({ [productName]: tile });

        return fs.writeFileAsync(`./${productName}/${z}/${y}/${x}.pbf`, buff);
      })
    }

    return Promise.resolve();
  }, {concurrency: 2000})
  .then(function writeTileJSON(tiles) {
    var tilejson = generateTileJSON({
      name: productName,
      tileUrl: `/${productName}/{z}/{y}/{x}.pbf`,
      bounds: geojson.bounds
    });
    return fs.writeFileAsync(`./${productName}/tilejson.json`, JSON.stringify(tilejson, null, 2));
  });
};