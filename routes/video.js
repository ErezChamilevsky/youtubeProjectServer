const { isLoggedIn } = require('../controllers/tokens');
const videoController = require('../controllers/video');
const commentController = require('../controllers/comment'); 
const userController = require('../controllers/user')


//creating a router
const express = require('express');
var router = express.Router();


router.route('/').get(videoController.getVideoListToPresent);  //returning list of 10 best videos and 10 random

router.route('/randomVideos/').get(videoController.getRandomVideosList); //get random 10 videos to list in the right in video page

//get video details
router.route('/:pid/')
    .get(videoController.getVideoByVideoId);

//get video details
router.route('/:pid/')
    .put(videoController.getVideoByVideoId);


//get uploader details
router.route('/users/:id')
    .get(userController.getUserDetailsById);

//get all uploader videos
router.route('/users/:id/uploads')
    .get(videoController.getVideoListByUserId);

router.route('/:pid/likes')
    .post(isLoggedIn, videoController.likeHandle) // while clicking on like
    .delete(isLoggedIn, videoController.dislikeHandle); // while clicking on dislike

router.route('/users/:id/uploads')
    .get(videoController.getVideoListByUserId);






router.route('/:pid/comments')
    .get(commentController.getCommentsByVideoId) // Get comments for a specific video
    .post(isLoggedIn, commentController.createComment); // Create a new comment for a specific video

router.route('/:pid/comments/:cid')
    .get(commentController.getCommentById) // Get a specific comment by comment ID
    .delete(isLoggedIn, commentController.deleteCommentById) // Delete a specific comment by comment ID
    .patch(isLoggedIn, commentController.editCommentById) // Partially update a specific comment by comment ID
    .put(isLoggedIn, commentController.editCommentById); // Fully update a specific comment by comment ID


module.exports = router;