const express = require('express');
const router = express.Router();



module.exports = function(app) {
	let planController = require('../controllers/planController');

	app.route('/api/plan')
		.get(planController.list_plan);

	app.route('/api/card')
		.get(planController.list_card);

};
