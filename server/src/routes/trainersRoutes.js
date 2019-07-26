module.exports = function(app) {
	let trainersController = require('../controllers/trainersController');

	app.route('/api/trainers')
		.get(trainersController.getTrainers)
		.post(trainersController.createTrainer);

	app.route('/api/trainers/:id')
		.get(trainersController.getTrainer)
		.put(trainersController.updateTrainer)
		.delete(trainersController.deleteTrainer);
};
