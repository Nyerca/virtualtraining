let mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
let User = mongoose.model('User');

exports.logoutUser = function(req, res, next) {
	//This invalidates our cookie if one exists
	req.logout();

	//Destroy session
	req.session = null;

	res.status(200).clearCookie('virtualtraining.sid', {path: '/'}).json({status: "Success"});

	console.log("logged out")
  
	//return res.send();
};

exports.loginUser = function(req, res, next) {
	let errors = [];
	console.log(req.body);
	// As per configuration (config/passport.js) we have the parameters: error, user and error info
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return res.status(500).json({msg: 'An internal error occurred trying to fetch the users information!'});
		}
		// if no user we assume something went wrong
		if (!user) {
		  return res.status(401).json({msg: 'Invalid mail or password'});
		}
		// req.login() assigns the user object to the request object req as req.user once the login operation completes. [For cookie]
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			return res.status(200).json({msg:'Login successfully'});
		});
	  })(req, res, next);
};

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
							res.status(201).json(user);
						})
						.catch(err => {
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