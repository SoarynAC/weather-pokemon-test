pokemons = []
pokeId = 0

function addPokeToMap(pokemon, lon, lat) {

  map.loadImage(pokemon.sprite, function(error, image) {
    if (error) {
      pokemons.push({
        "type": "Feature",
        "properties": {
          "description": "<strong style='text-transform: uppercase'>" + pokemon.name + "</strong>",
          "pokeid": pokeId++
        },
        "geometry": {
          "type": "Point",
          "coordinates": [lon, lat]
        }
      })
  
      map.getSource("pokemons").setData({
        "type": "FeatureCollection",
        "features": pokemons
      })
    } else {
      if (!map.hasImage(pokemon.name)) {
        map.addImage(pokemon.name, image)
      }
  
      pokemons.push({
        "type": "Feature",
        "properties": {
          "description": "<strong style='text-transform: uppercase font-size: 18px'>" + pokemon.name + "</strong>",
          "icon": pokemon.name,
          "pokeid": pokeId++
        },
        "geometry": {
          "type": "Point",
          "coordinates": [lon, lat]
        }
      })
  
      map.getSource("pokemons").setData({
        "type": "FeatureCollection",
        "features": pokemons
      })
    }

  })

}