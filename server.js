const express = require('express');
var server = express();


const bodyParser = require('body-parser');
server.use(bodyParser.json({ limit: '50mb' })); // Increase the limit for JSON and URL-encoded bodies
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
server.use(express.json());

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

//this routes if for crud operation in user
const users = require('./routes/user')
server.use('/api/users/', users)


//this routes is for login
const tokens = require('./routes/tokens')
server.use('/api/tokens/', tokens)



server.listen(process.env.PORT); //server listen in PORT (define in config/.env.local or test).