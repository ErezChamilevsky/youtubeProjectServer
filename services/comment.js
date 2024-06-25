const comment = require('../models/comment');

const createComment = async(videoId, userImg, userName, content, commentId) => {
    const comment = new Comment({videoId}, {userImg}, {userName}, {content}, {commentId });
    return await comment.save();
};

module.exports = {createComment};