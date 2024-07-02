const videoController = require('../controllers/video');
const commentController = require('../controllers/comment'); 

//creating a router
const express = require('express');
var router = express.Router();


router.route('/').get(videoController.getVideoListToPresent);  //returning list of 10 best videos and 10 random

router.route('/randomVideos/').get(videoController.getRandomVideosList); //get random 10 videos to list in the right in video page

//get video details
router.route('/:pid/')
    .get(videoController.getVideoByVideoId);

    //get uploader details
router.route('/:pid/user')
    .get(videoController.getUploaderByVideoId);




router.route('/:pid/comments')
    .get(commentController.getCommentsByVideoId) // Get comments for a specific video
    .post(commentController.createComment); // Create a new comment for a specific video

router.route('/:pid/comments/:cid')
    .get(commentController.getCommentById) // Get a specific comment by comment ID
    .delete(commentController.deleteCommentById) // Delete a specific comment by comment ID
    .patch(commentController.editCommentById) // Partially update a specific comment by comment ID
    .put(commentController.editCommentById); // Fully update a specific comment by comment ID


module.exports = router;