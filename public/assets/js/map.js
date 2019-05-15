mapboxgl.accessToken =
    'pk.eyJ1Ijoic29hcnluIiwiYSI6ImNqdmlranN0ajA2cWw0OW5xMzZrd2d3ZTEifQ.afKiCJGz3wRtp_V28Q0PLA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/soaryn/cjvln5cjv18nq1co47h8lmarz',
    center: [0, 0],
    zoom: 0,
    attributionControl: false,
    logoPosition: "bottom-right"
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
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

document.querySelector(".mapboxgl-ctrl-geocoder--input").addEventListener("change", function (e) {
    marker.setLngLat(geocoder.mapMarker._lngLat);
    onDragEnd();
});