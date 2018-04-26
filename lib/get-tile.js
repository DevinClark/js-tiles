// Longitude
function getXTile(lon, zoom) {
  return Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
}

// Latitude
function getYTile(lat, zoom) {
  return Math.floor(
    (1 -
      Math.log(
        Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)
      ) /
        Math.PI) /
      2 *
      Math.pow(2, zoom)
  );
}

function generateTileList(start, end) {
  var i;
  var list = [];
  if (start < end) {
    for (i = start; i <= end; i++) {
      list.push(i);
    }
  } else {
    for (i = start; i >= end; i--) {
      list.push(i);
    }
  }

  return list;
}

module.exports = function getBoundBoxTiles([minX, minY, maxX, maxY], zoom) {
  var z = zoom;
  var tiles = [];
  while (z >= 0) {
    console.log(`zoom: ${z}`);
    let x1 = getXTile(minX, z);
    let y1 = getYTile(minY, z);
    let x2 = getXTile(maxX, z);
    let y2 = getYTile(maxY, z);
    let x_list = generateTileList(x1, x2);
    let y_list = generateTileList(y1, y2);
    let i;
    let j;

    for (i = 0; i < x_list.length; i++) {
      for (j = 0; j < y_list.length; j++) {
        tiles.push([z, y_list[j], x_list[i]]);
      }
    }

    z--;
  }

  return tiles;
};
