const videoController = require('../controllers/video');

//creating a router
const express = require('express');
var router = express.Router();

// router.route('/').post(videoController.createVideo); //TODO neew to change to the right route

router.route('/').get(videoController.getVideoListToPresent);  //returning list of 10 best videos and 10 random



module.exports = router;

