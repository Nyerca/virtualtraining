let mongoose = require('mongoose');
let User = mongoose.model('User');

let data_muscoli = require('./muscoli.json');
let data_allenatori = require('./allenatori.json');
let data_requests = require('./request.json');
let data_piano = require('./piano.json');
let data_card = require('./card.json');

exports.list_plan = function(req, res) {
	res.json(data_piano);
};

exports.list_card = function(req, res) {
	res.json(data_card);
};
