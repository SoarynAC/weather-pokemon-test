var resultados = require('./controller/weather')

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.setHeader('Cache-Control', 'max-age=0');
        res.sendFile(__dirname + '/view/index.html')
    })

    app.get('/buscar', function (req, res) {
        response = {
            lon: req.query.lon,
            lat: req.query.lat
        }

        resultados(response.lon, response.lat)
            .then(result => {
                res.end(JSON.stringify(result))
            }).catch(function (err) {
                console.log(err)
                return err.response
            })

    })

}