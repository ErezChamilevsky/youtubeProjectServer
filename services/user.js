// craete here the logic of update/delete

const User = require('../models/user');


const getUserById = async (userId) => {
    const user = await User.findOne({ userId: userId });
    if(user)
        return user;
    else
        return null;
}

const updateUserById = async (userId, updateData) => {
    const options = { new: true, runValidators: true }; // Return the updated document and run validators
    const updatedUser = await User.findOneAndUpdate({ userId: userId }, updateData, options);
    return updatedUser; //retrun null if userId doesnt exist.
}

const deleteUserById = async (userId) => {
    const user = await User.findOneAndDelete({ userId: userId }); //if delete made successfully the function return the deleted user
    if(user)
        return user;
    else
        return null;
}




module.exports = {getUserById, deleteUserById, updateUserById}

