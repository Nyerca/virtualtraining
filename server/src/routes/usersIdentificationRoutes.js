const express = require('express');
const router = express.Router();

module.exports = function(app) {
	let userIdentificationController = require('../controllers/userIdentificationController');

    app.route('/api/register')
		.post(userIdentificationController.createUser);

    //TODO: login
};
