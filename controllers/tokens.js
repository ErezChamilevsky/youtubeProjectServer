const tokensService = require('../services/tokens');
const jwt = require('jsonwebtoken');
const key = "Some super secret key!"


const creatToken = async (req, res) => {
    token = await tokensService.createToken(req.body.userName, req.body.userPassword)
    console.log(token)
    if (token) {
        res.status(200).json({ token: token }); //return token to brwoser
    } else {
        res.status(404).json({ message: 'Invalid username and/or password' })
    }

}


// Ensure that the user sent a valid token
const isLoggedIn = (req, res, next) => {
    // If the request has an authorization header
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
            // Verify the token is valid
            const data = jwt.verify(token, key);
            console.log('The logged in user is: ' + data.username);
            // Token validation was successful. Continue to the actual function
            return next()
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    }
    else
        return res.status(403).send('Token required');
}


module.exports = { creatToken , isLoggedIn};
