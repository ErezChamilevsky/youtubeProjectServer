//create here the logic of add new user to mongoDB


const User = require('../models/user');
userIdCounter = 1;

const createUser = async (userName, userPassword, userConfirmPassword, displayName, userImgFile) => {
    // Check if the userName already exists
    userNameExist = checkIfUserameExist(userName);
    if(!userNameExist)
        return null;
    //check if the password valid.
    validPassword = validatePassword(userPassword);
    if(!validPassword)
        return null;
    //check if the password and confirm password are same
    confirmPassword = checkIfConfirmPassSameToPass(userPassword, userConfirmPassword)
    if(!confirmPassword)
        return null;

    const newUser = new User({userId : userIdCounter, userName : userName , userPassword : userPassword, displayName : displayName, userImgFile : userImgFile});
    userIdCounter++; //increment the Id counter
    return await newUser.save(); //return the new User object and  not the promise because 'await'
}


const checkIfUserNameExist = async(userName) =>{
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
       return null;
    }
    return 1;
}

//function who validate password
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

const checkIfConfirmPassSameToPass = (userPassword, userConfirmPassword) => {
    return userPassword === userConfirmPassword; //check if strings and the data type are equal
}

model.export = {createUser,checkIfUserNameExist, validatePassword};