mapboxgl.accessToken =
    'pk.eyJ1Ijoic29hcnluIiwiYSI6ImNqdmlranN0ajA2cWw0OW5xMzZrd2d3ZTEifQ.afKiCJGz3wRtp_V28Q0PLA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/soaryn/cjvsbojfr19gn1cnzshpcyqi6',
    center: [0, 0],
    zoom: 0,
    attributionControl: false,
    logoPosition: "bottom-right"
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    language: 'pt-BR',
    mapboxgl: mapboxgl
})

var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
})

map.addControl(geocoder);

map.addControl(geolocate);

var marker = new mapboxgl.Marker({
        draggable: true
    })
    .setLngLat([0, 0])
    .addTo(map);



map.on('click', function (e) {
    marker.setLngLat(e.lngLat);
    onDragEnd();
});

function onDragEnd() {
    var lngLat = marker.getLngLat();
    loadInfo(lngLat.lng, lngLat.lat);
}

marker.on('dragend', onDragEnd);

document.querySelector(".mapboxgl-ctrl-geocoder--input").addEventListener("change", function () {
    marker.setLngLat(geocoder.mapMarker._lngLat);
    onDragEnd();
});

var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('mouseenter', 'pokemons', function (e) {
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
    map.getCanvas().style.cursor = '';
    popup.remove();
});