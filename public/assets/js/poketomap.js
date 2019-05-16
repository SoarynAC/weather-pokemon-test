function addPokeToMap(pokemon, lon, lat) {
    pokeIcon = document.createElement('IMG');
    pokeIcon.src = pokemon.sprites.front_default;
    pokeIcon.style.width = '60px';
    pokeIcon.style.height = '60px';
    pokeIcon.style.objectFit = 'contain';

    new mapboxgl.Marker({
            element: pokeIcon,
            anchor: 'center'
        })
        .setLngLat([lon, lat])
        .addTo(map);
}