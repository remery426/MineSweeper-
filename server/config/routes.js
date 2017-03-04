var user = require('./../controllers/user.js')
module.exports = function(app){
    app.post('/highscore', function(req,res){
        user.checkscore(req,res)
    })
    app.post('/add', function(req,res){
        user.add(req,res)
    })
    app.get('/allusers', function(req,res){
        user.findall(req,res)
    })
}