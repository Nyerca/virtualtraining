const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
/*Note Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.*/

//const session = require('express-session');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())

//Cors config:
//  origin -> url of the origin of the admitted requests
//  credential: true -> Configures the Access-Control-Allow-Credentials CORS header. [Required to use cookies]
app.use(cors({
  origin:'http://localhost:8080',
  credentials: true,
}))

//Middleware cookie session
app.use(cookieSession({
  name: 'virtualtraining',
  keys: ['secretAndSuperRandomKey'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  cookie: {secure: true},
}));



//Importante inserirli dopo la sessione express o possono esserci problemi
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

var Trainer = require('./models/trainer')
var Users = require('./models/User')
var Sensors = require('./models/Sensor')
//Passport configuration
require('../config/passport')(passport);

mongoose.connect('mongodb://localhost/virtualtraining-dev', {useNewUrlParser:true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));



    function getRandomInt(min, max) {
			let reading = (Math.random() * (max - min + 1) + min);
			return (Math.round(reading * 2) / 2)
		}

    /*
    setInterval(function() {

      const newSensor = new Sensors({
        id: 1,
        name: "prova",
        type: "pres",
        value: getRandomInt(0, 60),
        date: "29/07/2019"
      });
      newSensor.save();
      console.log("sent");

      }, 2000);
*/


//var path = require('path');
//global.appRoot = path.resolve(__dirname);

var trainersRoutes = require('./routes/trainersRoutes');
var userIdentificationRoutes = require('./routes/usersIdentificationRoutes');
var planRequestRoutes = require('./routes/planRequestRoutes');
var planRoutes = require('./routes/planRoutes');
trainersRoutes(app);
userIdentificationRoutes(app);
planRequestRoutes(app);
planRoutes(app);
app.listen(process.env.PORT || 8081, () => console.log("Server online"))
