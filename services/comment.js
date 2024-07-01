const Comment = require('../models/comment');

const createComment = async (videoId, userId, content) => {
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
    const comment = await getCommentById(commentId);
    
    if (!comment) {
        throw new Error('Comment not found');
    }
    // Remove empty or null fields from updateData
    for (const key in updateData) {
        if (updateData[key] == null || updateData[key] === '') {
            delete updateData[key];
        }
    }

    // If there's nothing to update, return the existing comment
    if (Object.keys(updateData).length === 0) {
        return comment;
    }
    return await Comment.findOneAndUpdate({ commentId: commentId }, updateData, { new: true });
    
};

module.exports = {
    createComment,
    getCommentsByVideoId,
    getCommentById,
    deleteCommentById,
    editCommentById
};
