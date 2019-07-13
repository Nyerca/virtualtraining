var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.createUser = function(req, res) {
    console.log(req.body);
	var newUser = new User(req.body);
	newUser.save(function(err, trainer) {
		if (err) res.send(err);
		res.status(201).json(trainer);
	});
};
