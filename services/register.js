//create here the logic of add new user to mongoDB


const User = require('../models/user');
userIdCounter = 1;

const createUser = async (userName, userPassword, displayName, userImgFile) => {
    // Check if the userName already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
       return null;
    }

    const newUser = new User({userId : userIdCounter, userName : userName , userPassword : userPassword, displayName : displayName, userImgFile : userImgFile});
    userIdCounter++; //increment the Id counter
    return await newUser.save(); //return the new User object and  not the promise because 'await'
}


model.export = {createUser};