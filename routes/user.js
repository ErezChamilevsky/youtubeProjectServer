const userController = require('../controllers/user');


const express = require('express');
var router = express.Router();


router.route('/').post(userController.createUser);  //create new User

router.route('/:id').get(userController.getUserDetails);  //get the user details
router.route('/:id').patch(userController.updateUser); //update some of user details
router.route('/:id').put(userController.updateUser); //update all user details
router.route('/:id').delete(userController.deleteUser); // delete user.


module.exports = router