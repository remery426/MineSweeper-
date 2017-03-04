var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: {type: String, required: true},
    time: {type: Number, required: true},
    bombs: {type: Number, required: true},
    created_at: {type: Date, default: Date.now()}
})

mongoose.model('User', UserSchema)