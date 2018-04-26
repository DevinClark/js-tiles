const generateVectorTiles = require('./lib/generate-vector-tiles');

const productName = 'ok-census-tracts';
const tracts = require('./ok-census-tracts.json');


function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

tracts.features = tracts.features.map(function (feature) {
  var id = feature.properties.TRACTCE;

  return Object.assign(feature, {
    properties: {
      // Format Tract ID
      id: insert(id, id.length - 2, '.')
    }
  });
});

generateVectorTiles(tracts, productName)
  .catch(function (ex) {
    throw ex;
  });

