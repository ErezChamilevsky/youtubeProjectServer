const videoService = require('../services/video');
const userServiece = require('../services/user');


const createVideo = async (req, res) => {
    try {
        const userId = req.params.id;
        if (isNaN(userId)) {
            return res.status(400).json({ errors: ['Invalid user ID'] });
        }
        const user = await userServiece.getUserById(userId);
        if (!user || !user.displayName) {
            return res.status(400).json({ errors: ['User not found or display name missing'] });
        }
        const displayName = user.displayName;
        const createdVideo = await videoService.createVideo(
            req.body.img, req.body.videoSrc, req.body.title, displayName,
            req.body.publicationDate, req.body.views, req.body.description, req.body.likes, userId
        );

        res.json(createdVideo);
    } catch (error) {
        console.error('Error creating video:', error);
        return res.status(500).json({ errors: ['Failed to create video'] });
    }
};


// Get video details by video ID
const getVideoByVideoId = async (req, res) => {
    try {
        const video = await videoService.getVideoByIdAndUserId(req.params.pid, req.params.id);

        if (!video) {
            return res.status(404).json({ errors: ['Video not found'] });
        }

        res.json(video);
    } catch (error) {
        console.error('Error fetching video details:', error);
        return res.status(500).json({ errors: ['Failed to fetch video details'] });
    }
};

// Get list of videos to present
const getVideoListToPresent = async (_, res) => {
    try {
        const videosListToPresent = await videoService.getVideoListToPresent();

        if (!videosListToPresent || videosListToPresent.length === 0) {
            return res.status(404).json({ errors: ['No videos to present'] });
        }

        res.json(videosListToPresent);
    } catch (error) {
        console.error('Error fetching video list to present:', error);
        return res.status(500).json({ errors: ['Failed to fetch video list'] });
    }
};

// Get list of videos by user ID
const getVideoListByUserId = async (req, res) => {
    try {
        const videos = await videoService.getVideoListByUserId(Number(req.params.id));

        if (!videos || videos.length === 0) {
            return res.status(404).json({ errors: ['No videos found for this user'] });
        }

        res.json(videos);
    } catch (error) {
        console.error('Error fetching videos by user ID:', error);
        return res.status(500).json({ errors: ['Failed to fetch videos by user ID'] });
    }
};

// Get video details by video ID and user ID
const getVideoOfUserByVideoId = async (req, res) => {
    try {
        const video = await videoService.getVideoByIdAndUserId(req.params.pid, req.params.id);

        if (!video) {
            return res.status(404).json({ errors: ['Video not found'] });
        }

        res.json(video);
    } catch (error) {
        console.error('Error fetching user video:', error);
        return res.status(500).json({ errors: ['Failed to fetch user video'] });
    }
};

// Delete video by video ID and user ID
const deleteVideoByVideoId = async (req, res) => {
    try {
        const deletedVideo = await videoService.deleteVideoObject(req.params.pid, req.params.id);

        if (!deletedVideo) {
            return res.status(404).json({ errors: ['Failed to delete video'] });
        }

        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Error deleting video:', error);
        return res.status(500).json({ errors: ['Failed to delete video'] });
    }
};


// PATCH request to update specific fields of a video by ID
const updateVideoById = async (req, res) => {
    try {
        const updatedVideo = await videoService.updateVideoById(Number(req.params.pid), req.body);
        if (!updatedVideo) {
            return res.status(404).json({ errors: ['Video not found'] });
        }
        res.json(updatedVideo);
    } catch (error) {
        console.error('Error updating video by ID:', error);
        res.status(500).json({ errors: ['Failed to update video'] });
    }
};

module.exports = {
    createVideo,
    getVideoByVideoId,
    getVideoListToPresent,
    getVideoListByUserId,
    getVideoOfUserByVideoId,
    deleteVideoByVideoId,
    updateVideoById
};
