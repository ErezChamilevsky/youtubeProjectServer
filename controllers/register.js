const registerService = require('../services/register');

const createUser = async (req, res) => {
    newUser = await registerService.craeteUser(req.body.userName, req.body.userPassword, req.body.displayName, req.body.userImgFile)
    if (newUser){
        res.status(200).json({ message : "User create succesfully"});
    } else {
        res.status(409).json({ message : "userName already Exist"});
    }
   
}

model.export = {createUser};