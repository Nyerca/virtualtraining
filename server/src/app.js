const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
/*Note Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.*/
const session = require('express-session');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

//Middleware per l'express session
app.use(session({
    secret: 'muhahahaha', //Il segreto pu`o essere qualsiasi cosa
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: true }
  }));
//Importante inserirli dopo la sessione express o possono esserci problemi
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

var Trainer = require('./models/trainer')
var Users = require('./models/User')
//Passport configuration
require('../config/passport')(passport);

mongoose.connect('mongodb://localhost/virtualtraining-dev', {useNewUrlParser:true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


//var path = require('path');
//global.appRoot = path.resolve(__dirname);

var trainersRoutes = require('./routes/trainersRoutes');
var userIdentificationRoutes = require('./routes/usersIdentificationRoutes');
trainersRoutes(app);
userIdentificationRoutes(app);


app.listen(process.env.PORT || 8081, () => console.log("Server online"))