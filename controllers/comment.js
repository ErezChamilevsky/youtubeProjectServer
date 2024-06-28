const commentService = require('../services/comment');

const createComment = async (req, res) => {
    try {
        const comment = await commentService.createComment(
            req.params.pid, // videoId from URL
            req.body.userImg,
            req.body.userName,
            req.body.content,
            req.body.commentId
        );
        res.json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ errors: ['Failed to create comment'] });
    }
};

const getCommentsByVideoId = async (req, res) => {
    try {
        const comments = await commentService.getCommentsByVideoId(req.params.pid);
        if (!comments || comments.length === 0) {
            return res.status(404).json({ errors: ['No comments found for this video'] });
        }
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments by video ID:', error);
        res.status(500).json({ errors: ['Failed to fetch comments'] });
    }
};

const getCommentById = async (req, res) => {
    try {
        const comment = await commentService.getCommentById(req.params.cid);
        if (!comment) {
            return res.status(404).json({ errors: ['Comment not found'] });
        }
        res.json(comment);
    } catch (error) {
        console.error('Error fetching comment by ID:', error);
        res.status(500).json({ errors: ['Failed to fetch comment'] });
    }
};

const deleteCommentById = async (req, res) => {
    try {
        const result = await commentService.deleteCommentById(req.params.cid);
        if (!result) {
            return res.status(404).json({ errors: ['Comment not found'] });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment by ID:', error);
        res.status(500).json({ errors: ['Failed to delete comment'] });
    }
};

const editCommentById = async (req, res) => {
    try {
        const updatedComment = await commentService.editCommentById(req.params.cid, req.body);
        if (!updatedComment) {
            return res.status(404).json({ errors: ['Comment not found'] });
        }
        res.json(updatedComment);
    } catch (error) {
        console.error('Error editing comment by ID:', error);
        res.status(500).json({ errors: ['Failed to edit comment'] });
    }
};

module.exports = {
    createComment,
    getCommentsByVideoId,
    getCommentById,
    deleteCommentById,
    editCommentById
};
