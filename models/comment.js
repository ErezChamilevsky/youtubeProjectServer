const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Comment = new Schema({
    videoId: {
        type: Number,
        immutable: true // Makes the field read-only
    },

    userImg: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    commentId: {
        type: Number,
        uniuqe: true,
        required: true
    },
})

module.exports = mongoose.model('Comment', Comment);