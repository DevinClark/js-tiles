import mapboxGl from 'mapbox-gl';

(function () {
  mapboxGl.accessToken = 'pk.eyJ1IjoiZGNsYXJrIiwiYSI6ImNqNDZnc2d6ajJkY3gyeHM5a3BrYWM0Z24ifQ.A__4tMUIcETXdw8jlfRtyA';

  const map = new mapboxGl.Map({
    container: 'js-map-container',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 6,
    center: [-97, 35],
    maxBounds: [
      -103.002565,
      33.615832999999995,
      -94.430662,
      37.002206
    ]
  });

  map.on('load', function () {
    map.addLayer({
      "id": "ok-census-tracts",
      "type": "fill",
      "source": {
        type: 'vector',
        url: 'http://localhost/js-tiles/ok-census-tracts/tilejson.json'
      },
      "source-layer": "ok-census-tracts",
      "layout": {
      },
      "paint": {
        "fill-color": "#ff69b4",
        "fill-opacity": 0.7,
        "fill-outline-color": "#242424"
      }
    }, 'water');
  });

  map.on('click', 'ok-census-tracts', function (e) {
    console.log(e);
    new mapboxGl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<pre>' + JSON.stringify(e.features[0].properties, null, 2) + '</pre>')
      .addTo(map);
  });

}());
