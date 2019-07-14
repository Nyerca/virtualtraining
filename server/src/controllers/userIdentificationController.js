let mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
let User = mongoose.model('User');

exports.createUser = function (req, res) {
	let errors = [];

	console.log(req.body);

	if (req.body.password.length < 4) {
		errors.push('Password must be at least 4');
	}

	//Check if user already exists
	User.findOne({
		email: req.body.email
	}).then(user => {
		if (user) {
			errors.push('These email is already used!');
		} else if (errors.length == 0) {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				age: req.body.age,
				password: req.body.password
			});
			//Primo parametro: dimensione sale, secondo `e la callBack richiamata quando il sale `e pronto
			bcrypt.genSalt(10, (err, salt) => {
				//Hash prende la password, il sale e la callback da richiamare uina volta generta l' hash
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save()
						.then(user => {
							//Registrazione ok
							res.status(201).json(user);
						})
						.catch(err => {
							//res.send(err);
							console.log(err);
							errors.push('Error with newUser.save() [MongoDb error]!');
						});
				});
			});
		}
		//Check if errors exists
		if (errors.length > 0) {
			res.status(401).json({
				errors: errors,
				name: req.body.name,
				email: req.body.email,
				age: req.body.age
			});
		}
	});
};