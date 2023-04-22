const express = require('express');
const router = express.Router();



module.exports = function(app) {
	let planRequestController = require('../controllers/planRequestController');

	app.route('/api/muscles')
		.get(planRequestController.list_muscles)
		.post(planRequestController.create_muscle);

	app.route('/api/trainer')
		.get(planRequestController.list_allenatori)
		.post(planRequestController.create_muscle);

	app.route('/api/requests')
		.get(planRequestController.list_request)
		.post(planRequestController.create_request);

};
