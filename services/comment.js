const Comment = require('../models/comment');

const createComment = async (videoId, userId, content) => {
    console.log("gotHERE");
    const comment = new Comment({ videoId, userId, content});
    return await comment.save();
};

const getCommentsByVideoId = async (videoId) => {
    return await Comment.find({ videoId });
};

const getCommentById = async (commentId) => {
    return await Comment.findOne({ commentId });
};

const deleteCommentById = async (commentId) => {
    return await Comment.findOneAndDelete({ commentId });
};

const editCommentById = async (commentId, updateData) => {
    return await Comment.findOneAndUpdate({ commentId }, updateData, { new: true });
};

module.exports = {
    createComment,
    getCommentsByVideoId,
    getCommentById,
    deleteCommentById,
    editCommentById
};
