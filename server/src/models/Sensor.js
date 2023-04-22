const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type:Number,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    value: {
        type:Number,
        required:true
    },
    date: {
        type:String,
        required:true
    },
});
module.exports = mongoose.model('Sensor', UserSchema);
