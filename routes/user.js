const userController = require('../controllers/user');
const videoController = require('../controllers/video'); //need in order to present specific user's videos
const commentController = require('../controllers/comment'); 



const express = require('express');
var router = express.Router();

// TODO confirm that loggedUSer uploaded the video


router.route('/').post(userController.createUser);  //create new User

router.route('/:id').get(userController.getUserDetails);  //get the user details
router.route('/:id').patch(userController.updateUser); //update some of user details
router.route('/:id').put(userController.updateUser); //update all user details
router.route('/:id').delete(userController.deleteUser); // delete user.


// Routes for handling videos
router.route('/:id/videos')
    .get(videoController.getVideoListByUserId) // Get a list of videos for a specific user
    .post(videoController.createVideo); // Create a new video for a specific user

router.route('/:id/videos/:pid')
    .get(videoController.getVideoOfUserByVideoId) // Get a specific video for a specific user by video ID
    .delete(videoController.deleteVideoByVideoId) // Delete a specific video for a specific user by video ID
    .patch(videoController.updateVideoById) // Partially update a specific video for a specific user by video ID
    .put(videoController.updateVideoById); // Fully update a specific video for a specific user by video ID

// Routes for handling comments on videos
router.route('/:id/videos/:pid/comments')
    .get(commentController.getCommentsByVideoId) // Get comments for a specific video
    .post(commentController.createComment); // Create a new comment for a specific video

router.route('/:id/videos/:pid/comments/:cid')
    .get(commentController.getCommentById) // Get a specific comment by comment ID
    .delete(commentController.deleteCommentById) // Delete a specific comment by comment ID
    .patch(commentController.editCommentById) // Partially update a specific comment by comment ID
    .put(commentController.editCommentById); // Fully update a specific comment by comment ID



module.exports = router