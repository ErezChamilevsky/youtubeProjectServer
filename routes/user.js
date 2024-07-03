const userController = require('../controllers/user');
const videoController = require('../controllers/video'); //need in order to present specific user's videos
const commentController = require('../controllers/comment');
const { isLoggedIn } = require('../controllers/tokens');



const express = require('express');
var router = express.Router();

// TODO confirm that loggedUSer uploaded the video


router.route('/').post(userController.createUser);  //create new User

router.route('/:id').get(isLoggedIn, userController.getUserDetails);  //get the user details
router.route('/:id').patch(isLoggedIn, userController.updateUser); //update some of user details
router.route('/:id').put(isLoggedIn, userController.updateUser); //update all user details
router.route('/:id').delete(isLoggedIn, userController.deleteUser); // delete user.


// Routes for handling videos
router.route('/:id/videos')
    .get(videoController.getVideoListByUserId) // Get a list of videos for a specific user
    .post(isLoggedIn, videoController.createVideo); // Create a new video for a specific user

router.route('/:id/videos/:pid')
    .get(videoController.getVideoOfUserByVideoId) // Get a specific video for a specific user by video ID
    .delete(isLoggedIn, videoController.deleteVideoByVideoId) // Delete a specific video for a specific user by video ID
    .patch(isLoggedIn, videoController.updateVideoById) // Partially update a specific video for a specific user by video ID
    .put(isLoggedIn, videoController.updateVideoById); // Fully update a specific video for a specific user by video ID

// Routes for handling comments on videos
router.route('/:id/videos/:pid/comments')
    .get(commentController.getCommentsByVideoId) // Get comments for a specific video
    .post(isLoggedIn, commentController.createComment); // Create a new comment for a specific video




module.exports = router