var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrainerSchema = new Schema({
  name: {
    type: String
	},
  surname: {
    type: String
	},
});

module.exports = mongoose.model('Trainer', TrainerSchema);
