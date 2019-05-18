var request = require('superagent')
var getType = require('./type')
var getPokemon = require('./pokemon')

module.exports = async (lon, lat) => {
    const resWeather =
        await request.get('http://api.openweathermap.org/data/2.5/weather')
        .query({
            appid: '29d7591100934bfe7603aad29eba1626'
        })
        .query({
            lang: 'en'
        })
        .query({
            units: 'metric'
        })
        .query({
            lon: lon
        })
        .query({
            lat: lat
        })
        .then(function (response) {

            type = getType(response.body.main.temp, response.body.weather[0].main)

            return response
        })
        .catch(function (err) {
            type = 'normal'
            console.log(err)
            return err.response
        })

    resType = await request.get('https://pokeapi.co/api/v2/type/' + type)
        .catch(function (err) {
            console.log(err)
            return err.response
        })
    resPokemon = await getPokemon(resType)

    return {
        resWeather,
        resType,
        resPokemon
    }
}