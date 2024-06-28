const Video = require('../models/video');

const createVideo = async (img, videoSrc, title, displayName, publicationDate, views, description, likes, userId) => {
    const video = new Video(
        {img: img, videoSrc: videoSrc, title: title, displayName: displayName, description: description, userId: userId });

    //if it is not the defaults
    if (publicationDate) video.publicationDate = publicationDate;
    if (views) video.views = views;
    if (likes) video.likes = likes;

    return await video.save();
};


const getVideoById = async (id) => {
    const video = await Video.findOne({ id: id });
    if (video)
        return video;
    else
        return null;
}


// Function to get the 10 most viewed videos
async function getTenMostViewedVideos() {
    try {
        const mostViewedVideos = await Video.find().sort({ views: -1 }).limit(10).exec();
        return mostViewedVideos;
    } catch (error) {
        console.error('Error getting the 10 most viewed videos:', error);
        throw error;
    }
}

// Function to get 10 random videos from the remaining videos after excluding the 10 most viewed
async function getTenRandomVideos(excludeVideos) {
    try {
        // Get the count of videos excluding the most viewed ones
        const count = await Video.countDocuments({ _id: { $nin: excludeVideos.map(video => video._id) } }).exec();

        // Get 10 random videos from the remaining videos
        const randomVideos = await Video.aggregate([
            { $match: { _id: { $nin: excludeVideos.map(video => video._id) } } },
            { $sample: { size: 10 } }
        ]).exec();

        return randomVideos;
    } catch (error) {
        console.error('Error getting 10 random videos:', error);
        throw error;
    }
}

// Function to merge the two lists
async function getVideoListToPresent() {
    try {
        // Get the 10 most viewed videos
        const mostViewedVideos = await getTenMostViewedVideos();

        // Get 10 random videos from the remaining videos
        const randomVideos = await getTenRandomVideos(mostViewedVideos);

        // Merge the two lists
        return [...mostViewedVideos, ...randomVideos];
    } catch (error) {
        console.error('Error merging video lists:', error);
        throw error;
    }
}

async function getVideoListByUserId(userId) {
    const videos = await Video.find({ userId: userId });
    if (videos)
        return videos;
    else
        return null;
}

async function deleteVideoObject(video) {
    try {
        const deletedVideo = await Video.findOneAndDelete({ _id: video._id });

        if (deletedVideo) {
            return deletedVideo;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error deleting video object:', error);
        throw error;
    }
}


// Service function to partially update video by ID
const updateVideoById = async (videoId, updateData) => {
    return await Video.findOneAndUpdate({ id: videoId }, updateData, { new: true });
};



module.exports = {
    createVideo,
    getVideoById,
    getVideoListToPresent,
    getTenRandomVideos,
    getTenMostViewedVideos,
    getVideoListByUserId,
    deleteVideoObject,
    updateVideoById
};