const Video = require('../models/video');
const fs = require('fs');
const path = require('path');

const createVideo = async (img, videoSrc, title, displayName, description, userId) => {
   // Define the directory where you want to save the video files
   const videoDir = path.join(__dirname,'..', 'videos');

   // Ensure the directory exists
   if (!fs.existsSync(videoDir)) {
       fs.mkdirSync(videoDir);
   }

   const videoFileName = `${title}.mp4`; // Convert the video is in MP4 format.
   const videoPath = path.join(videoDir, videoFileName);


   let videoSrcRmHeader = videoSrc.split(';base64,').pop(); //remove the header of base64 representation of the video.
   // Decode the base64 video data and save the video file to the directory
   const videoBuffer = Buffer.from(videoSrcRmHeader, 'base64');
   fs.writeFileSync(videoPath, videoBuffer);

   // Save only the path to the video file in MongoDB
   const video = new Video({
       img: img,
       videoSrc: videoPath, // Save the path, not the actual file
       title: title,
       displayName: displayName,
       description: description,
       userId: userId
   });

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