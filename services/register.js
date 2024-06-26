//create here the logic of add new user to mongoDB


const User = require('../models/user');
userIdCounter = 1;

const checkIfUserNameExist = async(userName) =>{
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
       return true;
    }
    else{ return false;} //if userName doesnt exist yet.
  
}

//function who validate password
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

const checkIfConfirmPassSameToPass = (userPassword, userConfirmPassword) => {
    return userPassword === userConfirmPassword; //check if strings and the data type are equal
}


const createUser = async (userName, userPassword, userConfirmPassword, displayName, userImgFile) => {
    // Check if the userName already exists
    const userNameExist = await checkIfUserNameExist(userName);
    if(userNameExist)
        return { success: false, message: 'Username already exists' };

    //check if the password valid.
    const validPassword = validatePassword(userPassword);
    if(!validPassword)
        return { success: false, message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.'};
    
    //check if the password and confirm password are same
    const confirmPassword = checkIfConfirmPassSameToPass(userPassword, userConfirmPassword)
    if(!confirmPassword)
        return { success: false, message: 'Password and Confirm Password fields do not match.' };

    const newUser = new User({userId : userIdCounter, userName : userName , userPassword : userPassword, displayName : displayName, userImgFile : userImgFile});
    userIdCounter++; //increment the Id counter
    await newUser.save(); //save the new user in mongoDB ,and return the new User object and not the promise because 'await'
    return { success: true, message: 'User created successfully', user: newUser }; // Return the new user object
    
}

module.exports = {createUser,checkIfUserNameExist, validatePassword, checkIfConfirmPassSameToPass};