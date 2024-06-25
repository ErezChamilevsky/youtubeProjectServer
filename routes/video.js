const videoController = require('../controllers/video');

//creating a router
const express = require('express');
var router = express.Router();

router.route('/').post(videoController.createVideo); //TODO neew to change to the right route



module.exports = router;

