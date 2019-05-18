pokemons = [];
pokeId = 0;

function addPokeToMap(pokemon, lon, lat) {

  map.loadImage(pokemon.sprites.front_default, function(error, image) {
    if (error) {
      throw error;
    }
    if (!map.hasImage(pokemon.name)) {
      map.addImage(pokemon.name, image);
    }

    pokemons.push({
      "type": "Feature",
      "properties": {
        "description": "<strong style='text-transform: uppercase'>" + pokemon.name + "</strong>",
        "icon": pokemon.name,
        "pokeid": pokeId++
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