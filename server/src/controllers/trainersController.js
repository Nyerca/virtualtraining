var mongoose = require('mongoose');
var Trainer = mongoose.model('Trainer');

exports.getTrainers = function(req, res) {
	
	console.log('Richiesta di accesso alla lista dei trainer da parte di:');
	if(req.isAuthenticated()){
		console.log(req.session.passport.user);
	} else {
		console.log('guest');
	}
	console.log('--------------------------------------------------------');

	const trainers = [
		new Trainer(
			{
				"name" : "Mario",
			  "surname" : "Rossi"
		  }
		),
		new Trainer(
			{
				"name" : "Giorgio",
			  "surname" : "Bianchi"
		  }
		)
	]
	//console.log(trainers);
	// Mock
	res.send(JSON.stringify(trainers));
	/*
	Trainer.find({}, function(err, trainers) {
		if (err)
			res.send(err);
		res.json(trainers);
	});
	*/
};

exports.getTrainer = function(req, res) {
	/*
	In questo caso l'id è l'object id che viene assegnato ai documenti direttamente da MongoDB.
	L'id presente nel file mongo_shell è semplicemente un retaggio dell'esercitazione precedente (infatti non è stato incluso nello Schema Moongose che vi abbiamo fornito.
	*/
	Trainer.findById(req.params.id, function(err, trainer) {
		if (err)
			res.send(err);
		else{
			if(trainer==null){
				res.status(404).send({
					description: 'Trainer not found'
				});
			}
			else{
				res.json(trainer);
			}
		}
	});
};

exports.createTrainer = function(req, res) {
	var newTrainer = new Trainer(req.body);
	newTrainer.save(function(err, trainer) {
		if (err)
			res.send(err);
		res.status(201).json(trainer);
	});
};

exports.updateTrainer = function(req, res) {
	Trainer.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, trainer) {
		if (err)
			res.send(err);
		else{
			if(trainer==null){
				res.status(404).send({
					description: 'Trainer not found'
				});
			}
			else{
				res.json(trainer);
			}
		}
	});
};

exports.deleteTrainer = function(req, res) {
	Trainer.deleteOne({_id: req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		else{
			if(result.deletedCount==0){
				res.status(404).send({
					description: 'Trainer not found'
				});
			}
			else{
				res.json({ message: 'Trainer successfully deleted' });
			}
		}
  });
};
