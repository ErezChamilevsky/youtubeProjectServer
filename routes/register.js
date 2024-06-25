const registerController = require('../controllers/register');


const express = require('express');
var router = express.Router();

router.route('/').post(registerController.createUser);  //create new User
    


module.exports = router