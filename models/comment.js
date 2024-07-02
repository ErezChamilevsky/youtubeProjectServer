const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = new Schema({
    videoId: {
        type: Number, // 
        required: true,
        immutable: true // Makes the field read-only
    },

    userId: {
        type: Number,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    commentId: {
        type: Number, 
        unique: true, // Corrected spelling
        immutable: true
    },
});

// Static method to find the highest ID and increment it
Comment.statics.getNextId = async function () {
    const Comment = await this.findOne().sort('-commentId').exec();
    return Comment ? Comment.commentId + 1 : 1;
};

// Pre-save hook to set the ID
Comment.pre('save', async function (next) {
    if (this.isNew) {
        const nextId = await this.constructor.getNextId();
        this.commentId = nextId;
    }
    next();
});

module.exports = mongoose.model('Comment', Comment);
