const registerService = require('../services/register');

const createUser = async (req, res) => {
    result = await registerService.craeteUser(req.body.userName, req.body.userPassword, req.body.userConfirmPassword, req.body.displayName, req.body.userImgFile)
    
    if (result.success) {
        res.status(200).json({ message: result.message, user: result.user });
    } else {
        res.status(409).json({ message: result.message });
    }
   
}

module.exports = {createUser};