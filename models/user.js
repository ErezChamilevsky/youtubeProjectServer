const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const User = new Schema({
    userId: {
        type: Number,
        unique: true,
        immutable: true, // Makes the field read-only
    },

    userName: {
        type: String,
        required: true
    },

    userPassword: {
        type: String,
        required: true
    },

    displayName: {
        type: String,
        required: true
    },

    userImgFile: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('User', User);