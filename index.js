var express = require('express')
var app = express()

const PORT = process.env.PORT || 5000

require('./src/routes')(app)

app.use(express.static(__dirname + '/public'))

var server = app.listen(PORT, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('App listening on %s port %s', host, port)
})
