// Use a library to perform the cryptographic operations
const jwt = require("jsonwebtoken")
const User = require("../models/user")


// We are using cryptography, to ensure that no one else will be able to impersonate users
// To that end, we are going to use the following secret key
// Keep it safe. No one except the server should know this secret value
const key = "Some super secret key!"


//this function check if user exist in database and create token for him.
const createToken = async (userName, userPassword) => {
    existUser = await User.findOne({userName: userName, userPassword: userPassword}) //if no match, existUser will be null
    console.log(existUser)
    if(existUser) {
    // We now want to generate the JWT.  
    const data = userName
    // Generate the token.
    const token = jwt.sign(data, key)
    // Return the token to the cotroller
    return token
    } else{
        return null
    }
}

module.exports = { createToken }