var request = require('superagent')

module.exports = async function (list) {

    num = Math.floor(Math.random() * (list.body.pokemon.length/2))

    pokemon = await request.get(list.body.pokemon[num].pokemon.url)
        .then(function (res) {
            return res
        })
        .catch(function (err) {
            console.log(err)
            return err.response
        })
    return pokemon
}