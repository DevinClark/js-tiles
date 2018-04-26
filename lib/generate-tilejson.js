module.exports = function generateTileJSON(product) {
  return {
    tilejson: "2.2.0",
    name: product.name,
    tiles: [
      product.tileUrl
    ],
    bounds: product.bounds
  }
}