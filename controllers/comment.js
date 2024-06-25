const commentService = require('../services/comment');

const createComment = async (req, res) => {
    res.json(await commentService.createComment(req.body.videoId,
        req.body.userImg,
        req.body.userName,
        req.body.content,
        req.body.commentId,

    ));
}



module.exports = { createComment };