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
        });

        map.getSource("pokemons").setData({
            "type": "FeatureCollection",
            "features": pokemons
        });


    })

}