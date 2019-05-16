pokemons = [];

function addPokeToMap(pokemon, lon, lat) {

    map.loadImage(pokemon.sprites.front_default, function (error, image) {
        if (error) {
            throw error;
        }
        
        map.addImage(pokemon.name, image);

        pokemons.push({
            "type": "Feature",
            "properties": {
                "description": "<strong style='text-transform: uppercase'>" + pokemon.name + "</strong>",
                "icon": pokemon.name
            },
            "geometry": {
                "type": "Point",
                "coordinates": [lon, lat]
            }
        })

        if (map.getLayer('pokemons')) {
            map.removeLayer('pokemons');
            map.removeSource('pokemons');
        }

        map.addLayer({
            "id": "pokemons",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": pokemons
                }
            },
            "layout": {
                "icon-image": "{icon}",
                "icon-allow-overlap": true,
                "icon-size": 0.5
            }
        });
    })

}