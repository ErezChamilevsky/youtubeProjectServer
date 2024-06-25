const commentController = require('../controllers/comment');

//creating a router
const express = require('express');
var router = express.Router();

router.route('/').post(commentController.createComment); //TODO neew to change to the right route
    


module.exports = router;

