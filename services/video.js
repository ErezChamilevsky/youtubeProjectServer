const Video = require('../models/video');
const fs = require('fs');
const path = require('path');
const net = require('net');

const createVideo = async (img, videoSrc, title, displayName, description, userId) => {
   // Define the directory where you want to save the video files
   const videoDir = path.join(__dirname,'..', 'uploadvideos');

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


// Function to merge the two lists and sent the to the client that he can present them in HomePage
async function getVideoListToPresent() {
    try {
        // Get the 10 most viewed videos
        const mostViewedVideos = await getTenMostViewedVideos();
        console.log('mostViewedVideos:', mostViewedVideos);
        // Get 10 random videos from the remaining videos
        const randomVideos = await getTenRandomVideos(mostViewedVideos);
        console.log('randomVideos:', randomVideos);
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

async function getVideoByIdAndUserId(videoId, userId) {
    try {
        const video = await Video.findOne({ id: videoId, userId: userId });
        return video;
    } catch {
        throw error;
    }
}

//changed in order to update the views +1 while requesting it from server
async function getVideoByVideoId(videoId) {
    try {
        // Find the video and increment the view count atomically
        const video = await Video.findOneAndUpdate(
            { id: videoId },
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!video) {
            throw new Error('Video not found');
        }

        //video.userId is not good, cause its user id of who upload the video and not user id who connected to website!!!!
        sendVideoDataToTCPServer(video.id, video.views, video.userId); 

        return video;

    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {*} videoId - the id of the video
 * @param {*} videoViews - the views of the video
 * @param {*} userId - the id of the user who watched the video
 * 
 * This function reports when user click and watch some video to the TCP server. 
 */
function sendVideoDataToTCPServer(videoId, videoViews, userId) {
  const client = new net.Socket();
  
  //connect to TCP server in port 5555
  client.connect(5555, '127.0.0.1', function() {
    console.log('Connected to TCP server');
    
    // Construct message to send (e.g., JSON format)
    const message = JSON.stringify({ videoId, videoViews, userId });

    // Send the message
    client.write(message);

    // we need Close the connection only after the user logged out
    //client.end();
  });

  //print the data the server send
  client.on('data', function(data) {
    console.log('Received: ' + data);
  });

  client.on('close', function() {
    console.log('Connection closed');
  });

  client.on('error', function(err) {
    console.error('TCP connection error:', err);
  });
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

// dislike handle
const dislikeHandle = async (videoId) => {
    const video = await getVideoByVideoId(videoId);
    if (!video) {
        throw new Error('Video not found');
    }

    const updatedData = { $inc: { likes: -1 } }; // Decrement the likes field by 1

    return await Video.findOneAndUpdate({ id: videoId }, updatedData, { new: true });
};

// like handle
const likeHandle = async (videoId) => {
    const video = await getVideoByVideoId(videoId);
    if (!video) {
        throw new Error('Video not found');
    }

    const updatedData = { $inc: { likes: 1 } }; // Increment the likes field by 1

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
    getVideoByVideoId,
    dislikeHandle,
    likeHandle
};