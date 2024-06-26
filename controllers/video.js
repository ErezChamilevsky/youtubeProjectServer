const videoService = require('../services/video');


const createVideo = async (req, res) => {
    res.json(await videoService.createVideo(req.body.id,
        req.body.img,
        req.body.videoSrc,
        req.body.title,
        req.body.displayName,
        req.body.publicationDate,
        req.body.views,
        req.body.description,
        req.body.likes,
        req.body.userId

    ));
}



module.exports = { createVideo };