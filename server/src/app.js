const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongoose = require('mongoose')
var Trainer = require('./models/trainer')

var Users = require('./models/User')


//var path = require('path');
//global.appRoot = path.resolve(__dirname);

var trainersRoutes = require('./routes/trainersRoutes');
var userIdentificationRoutes = require('./routes/usersIdentificationRoutes');
trainersRoutes(app);
userIdentificationRoutes(app);


app.listen(process.env.PORT || 8081, () => console.log("Server online"))