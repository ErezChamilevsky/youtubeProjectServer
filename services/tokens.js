// Use a library to perform the cryptographic operations
const jwt = require("jsonwebtoken")


// We are using cryptography, to ensure that no one else will be able to impersonate users
// To that end, we are going to use the following secret key
// Keep it safe. No one except the server should know this secret value
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"


const createToken = (userName) => {
    // We now want to generate the JWT.  
    const data = { username: req.body.username }
    // Generate the token.
    const token = jwt.sign(data, key)
    // Return the token to the browser
    res.status(201).json({ token });
}

module.exports = { createToken }