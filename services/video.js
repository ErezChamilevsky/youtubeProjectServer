const video = require('../models/video');

const createVideo = async (
    id, img, videoSrc, title, displayName, description, userId) => {
    const video = new video(
        {id}, {img}, {videoSrc}, {title}, {displayName}, {description}, {userId});

    //if it is not the defaults
    if(publicationDate) video.publicationDate = publicationDate;
    if (views) video.views = views;
    if (likes) video.likes = likes;
    
    return await video.save();
};

module.exports = { createVideo };