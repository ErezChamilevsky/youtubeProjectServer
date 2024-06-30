const tokensService = require('../services/tokens');

const creatToken = async (req, res) => {
    token = await tokensService.createToken(req.body.userName, req.body.userPassword)
    console.log(token)
    if (token) {
        res.status(200).json({ token: token}); //return token to brwoser
    } else {
        res.status(404).json( {message: 'Invalid username and/or password'})
    }
   
}

module.exports = { creatToken };
