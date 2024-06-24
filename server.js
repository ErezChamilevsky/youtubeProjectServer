const express = require('express');
var server = express();


const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: true}));
server.use(express.json);

const cors = require('cors');
server.use(cors());

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);


const mongoose = require('mongoose');
//connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
 


server.use(express.static('public'));

//routes list
const register = require('./routes/register');
server.use('/api/users', register);


server.listen(process.env.PORT); //server listen in PORT (define in config/.env.local).