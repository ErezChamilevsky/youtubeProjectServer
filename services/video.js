const Video = require('../models/video');

const createVideo = async (img, videoSrc, title, displayName, publicationDate, views, description, likes, userId) => {
    const video = new Video(
        { img: img, videoSrc: videoSrc, title: title, displayName: displayName, description: description, userId: userId });

    //if it is not the defaults
    if (publicationDate) video.publicationDate = publicationDate;
    if (views) video.views = views;
    if (likes) video.likes = likes;

    return await video.save();
};


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
// Function to get 10 random videos, optionally excluding specified videos
async function getTenRandomVideos(excludeVideos) {
    try {
        let query = {};

        if (excludeVideos && excludeVideos.length > 0) {
            query = { _id: { $nin: excludeVideos.map(video => video._id) } };
        }

        const count = await Video.countDocuments(query).exec();

        const randomVideos = await Video.aggregate([
            { $match: query },
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

async function getVideoListToPresent() {
    try {
        // Get the 10 most viewed videos
        const mostViewedVideos = await getTenMostViewedVideos();

        // Get 10 random videos from the remaining videos
        const randomVideos = await getTenRandomVideos(mostViewedVideos);

        // Merge the two lists
        return [...mostViewedVideos, ...randomVideos];
    } catch (error) {
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

async function getVideoByIdAndUserId(videoId, userId) {
    try {
        const video = await Video.findOne({ id: videoId, userId: userId });
        return video;
    } catch {
        throw error;
    }
}

async function getVideoByVideoId(videoId) {
    try {
        const video = await Video.findOne({ id: videoId});
        return video;
    } catch (error) {
        throw error;
    }
}

async function deleteVideoObject(videoId, userId) {
    try {
        const deletedVideo = await Video.findOneAndDelete({ id: videoId, userId: userId });
        return deletedVideo;

    } catch (error) {
        console.error('Error deleting video object:', error);
        throw error;
    }
}


// Service function to partially update video by ID
const updateVideoById = async (videoId, userId, updateData) => {
    const video = await getVideoByIdAndUserId(videoId, userId);
    if (!video) {
        throw new Error('Video not found');
    }

    // Create a new object with the existing video data
    const updatedData = { ...video._doc };

    // Update only the fields that are present in updateData
    for (const key in updateData) {
        updateData[key];
        if (updateData.hasOwnProperty(key) && updateData[key] != '') {
            updatedData[key] = updateData[key];
        }
    }

    return await Video.findOneAndUpdate({ id: videoId }, updatedData, { new: true });
};


module.exports = {
    createVideo,
    getVideoListToPresent,
    getTenRandomVideos,
    getTenMostViewedVideos,
    getVideoListByUserId,
    deleteVideoObject,
    updateVideoById,
    getVideoByIdAndUserId,
    getVideoByVideoId
};