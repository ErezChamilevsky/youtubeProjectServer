const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const comment = new Schema({
    videoId: {
        type: Number, // 
        required: true,
        immutable: true // Makes the field read-only
    },

    userId: {
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
        immutable: true
    },
});

// Static method to find the highest ID and increment it
comment.statics.getNextId = async function () {
    const comment = await this.findOne().sort('-commentId').exec();
    return comment ? comment.commentId + 1 : 1;
};

// Pre-save hook to set the ID
comment.pre('save', async function (next) {
    if (this.isNew) {
        const nextId = await this.constructor.getNextId();
        this.commentId = nextId;
    }
    next();
});

module.exports = mongoose.model('Comment', comment);
