const tokensService = require('../services/tokens');

const creatToken = async (req, res) => {
    token = await tokensService.createToken(req.body.userName)
    res.status(200).json({ token: token});
}

module.exports = { creatToken };
