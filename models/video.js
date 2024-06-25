const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Video = new Schema({
    id: {
        type: Number,
        unique: true,
        immutable: true, // Makes the field read-only
    },

    img: {
        type: String,
        required: true
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
        required: true
    },
})

module.exports = mongoose.model('Video', Video);