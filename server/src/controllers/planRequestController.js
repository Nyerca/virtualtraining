let mongoose = require('mongoose');
let User = mongoose.model('User');

let data_muscoli = require('./muscoli.json');
let data_allenatori = require('./allenatori.json');
let data_requests = require('./request.json');
let data_piano = require('./piano.json');
let data_card = require('./card.json');

exports.list_muscles = function(req, res) {
	/*
	Movie.find({}, function(err, movie) {
		if (err)
			res.send(err);
		res.json(movie);
	});
	*/
	res.json(data_muscoli);
};

exports.create_muscle = function(req, res) {
	var new_movie = new Movie(req.body);
	new_movie.save(function(err, movie) {
		if (err)
			res.send(err);
		res.status(201).json(movie);
	});

};

exports.list_allenatori = function(req, res) {
	/*
	Movie.find({}, function(err, movie) {
		if (err)
			res.send(err);
		res.json(movie);
	});
	*/
	console.log("OK1");
	res.json(data_allenatori);
};

exports.list_request = function(req, res) {
	res.json(data_requests);
};

exports.create_request = function(req, res) {
	var new_req = req.body;
	console.log(new_req); //La richiesta fino a qui arriva ma non la salva dopo
	new_req.id = Math.max.apply(Math, data_requests.map(function(obj) { return obj.id; })) + 1;
	data_requests.push(new_req);

	res.status(201).json(new_req);
};
