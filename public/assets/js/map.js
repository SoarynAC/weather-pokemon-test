mapboxgl.accessToken =
  'pk.eyJ1Ijoic29hcnluIiwiYSI6ImNqdmlranN0ajA2cWw0OW5xMzZrd2d3ZTEifQ.afKiCJGz3wRtp_V28Q0PLA';

onPokemon = false;

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/soaryn/cjvybmcv307n41dn2aowj5oul',
  center: [0, 0],
  zoom: 0,
  attributionControl: false,
  logoPosition: "bottom-right"
});

var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  language: 'en-US',
  mapboxgl: mapboxgl,
  zoom: 12,
  types: "district, place, locality, country",
  clearAndBlurOnEsc: true,
  flyTo: {
    bearing: 1,
    speed: 10, 
    curve: 10,
    easing: function (t) {
      return t;
    }
  },
  limit: 20
})

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

/*
var geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
})

map.addControl(geolocate);*/

var marker = new mapboxgl.Marker({
    draggable: true
  })
  .setLngLat([0, 0])
  .addTo(map);

map.on('click', e => {
  if (onPokemon == false) {
    marker.setLngLat(e.lngLat);
    onDragEnd();
  }
});

map.on('click', 'pokemons', e => {
  loadPoke(e.features[0].properties.pokeid);
})

function onDragEnd() {
  var lngLat = marker.getLngLat();
  loadInfo(lngLat.lng, lngLat.lat);
}

marker.on('dragend', onDragEnd);

geocoder.on('result', function () {
  marker.setLngLat(geocoder.mapMarker._lngLat);
  geocoder.clear();
  setTimeout(() => {
    document.querySelector(".mapboxgl-ctrl-geocoder--input").blur();
    onDragEnd();
  }, 1000);
})

var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
  className: "popup"
});

map.on('mousemove', 'pokemons', function (e) {
  onPokemon = true;
  map.getCanvas().style.cursor = 'pointer';

  var coordinates = e.features[0].geometry.coordinates.slice();
  var description = e.features[0].properties.description;

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  popup.setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});

map.on('mouseleave', 'pokemons', function () {
  onPokemon = false;
  map.getCanvas().style.cursor = '';
  popup.remove();
});


map.on('load', () => {

  document.querySelector(".mapboxgl-ctrl-geocoder--input").focus();

  map.addSource("pokemons", {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": []
    }
  });

  map.addLayer({
    "id": "pokemons",
    "type": "symbol",
    "source": "pokemons",
    "layout": {
      "icon-image": "{icon}",
      "icon-allow-overlap": true,
      "icon-size": 0.5,
      "icon-padding": 0,
      "icon-ignore-placement": true
    }
  });

  loadUserLocation();
})