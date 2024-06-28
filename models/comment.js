const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const comment = new Schema({
    videoId: {
        type: Number, // 
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
        unique: true, // Corrected spelling
        required: true,
        immutable: true
    },
});

// Static method to find the highest commentId and increment it
comment.statics.getNextId = async function () {
    const comment = await this.findOne().sort('-commentId').exec();
    return comment ? comment.commentId + 1 : 1;
};

// Pre-save hook to set the commentId
comment.pre('save', async function (next) {
    if (this.isNew) {
        const nextId = await this.constructor.getNextId();
        this.commentId = nextId; // Corrected field to set commentId
    }
    next();
});

module.exports = mongoose.model('Comment', comment);
