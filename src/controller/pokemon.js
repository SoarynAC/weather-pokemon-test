var request = require('superagent')

module.exports = async function (list) {

    do {

        do {
            num = Math.floor(Math.random() * list.pokemon.length)
        } while (list.pokemon[num].pokemon.name.indexOf("-") !== -1)

        pokemon = await request.get(list.pokemon[num].pokemon.url)
            .then(function (res) {
                return res
            })
            .catch(function (err) {
                console.log(err)
                return err.response
            })

    } while (pokemon.body.id > 721)

    pokemon = {
        "height": pokemon.body.height,
        "weight": pokemon.body.weight,
        "name": pokemon.body.name,
        "types": pokemon.body.types,
        "stats": pokemon.body.stats,
        "sprite": pokemon.body.sprites.front_default,
        "moves": pokemon.body.moves
    }

    return pokemon
}