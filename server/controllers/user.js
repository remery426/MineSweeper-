var mongoose = require('mongoose')
var Users = mongoose.model('User');
module.exports = function () {
    return {
        checkscore: function (req, res) {
            Users.find({ bombs: req.body.bombs }, null, { sort: 'time' }, function (err, data) {
                if (err) {
                    res.json(false)
                }
                else {
                    var count = 0;
                    if (data.length < 10) {
                        res.json(true)
                    }
                    else {
                        if (data[9].time > req.body.time) {
                            res.json(true)
                        }
                        else {
                            res.json(false)
                        }
                    }
                }
            })
        },
        add: function (req, res) {
            Users.find({ bombs: req.body.bombs }, null, { sort: 'time' }, function (err, data) {
                if (data.length >= 10) {
                    data.pop()
                }
                var newUser = new Users(req.body);
                newUser.save(function (err, data) {
                    if (err) {
                        res.json(false)
                    }
                    else {
                        res.json(data)
                    }
                })
            })
        },
        findall: function (req, res) {
            Users.find({}, null, { sort: 'time' }, function (err, data) {
                if (!err) {
                    res.json(data)
                }
                else{
                    res.json(false);
                }
            })
        }
    }
}()