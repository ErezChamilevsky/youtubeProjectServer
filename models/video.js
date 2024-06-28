const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const video = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        immutable: true, // Makes the field read-only
    },
    img: {
        type: String,
        // required: true
    },
    videoSrc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    userId: {
        type: Number,
        required: true,
        immutable: true, // Makes the field read-only
    }
});

// Static method to find the highest ID and increment it
video.statics.getNextId = async function () {
    const video = await this.findOne().sort('-id').exec();
    return video ? video.id + 1 : 1;
};

// Pre-save hook to set the ID
video.pre('save', async function (next) {
    if (this.isNew) {
        const nextId = await this.constructor.getNextId();
        this.id = nextId;
    }
    next();
});

module.exports = mongoose.model('Video', video);
