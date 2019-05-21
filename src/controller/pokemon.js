var request = require('superagent')

module.exports = async function (list) {

    do {

        do {
            num = Math.floor(Math.random() * list.body.pokemon.length)
        } while (list.body.pokemon[num].pokemon.name.indexOf("-") !== -1)

        pokemon = await request.get(list.body.pokemon[num].pokemon.url)
            .then(function (res) {
                return res
            })
            .catch(function (err) {
                console.log(err)
                return err.response
            })

    } while (pokemon.body.id > 721)

    return pokemon
}