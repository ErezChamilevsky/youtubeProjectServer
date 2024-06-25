const userController = require('../controllers/user');


const express = require('express');
var router = express.Router();


router.route('/').get(userController.getUserDetails);  //get the user details
router.route('/').patch(userController.updateUser); //update some of user details
router.route('/').put(userController.updateUser); //update all user details
router.route('/').delete(userController.deleteUser); // delete user.


module.exports = router