const express = require('express');
const router = express.Router();

//TODO: da testare!!!!!!!
const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('You are not authenticated');
    } else {
      return next();
    }
  }

module.exports = function(app) {
	let userIdentificationController = require('../controllers/userIdentificationController');

    app.route('/api/register')
    .post(userIdentificationController.createUser);

    app.route('/api/login')
    .post(userIdentificationController.loginUser);

    app.route('/api/logout') 
    .get(authMiddleware, userIdentificationController.logoutUser);
      
};
