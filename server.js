var express = require('express')
var app = express()
var bp = require('body-parser')
var path = require('path')

app.use(express.static(path.join(__dirname, './client')))
app.use(express.static(path.join(__dirname, './node_modules')))
app.use(bp.json())

require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)

app.listen(8000, function(){
    console.log('listening on 8000')
})