const userService = require('../services/user');

const createUser = async (req, res) => {
    result = await userService.createUser(req.body.userName, req.body.userPassword, req.body.userConfirmPassword, req.body.displayName, req.body.userImgFile)
    
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(409).json({ message: result.message });
    }
   
}



const getUserDetails = async (req, res) => {
    console.log(req.params.id);
    const user = await userService.getUserById(req.params.id);
    console.log(user);
    // check if user exist
    if(!user){
        return res.status(404).json({ errors: ['User not found']});
    }
    res.json(user);
}




const updateUser = async (req, res) => {
    const updatedUser = await userService.updateUserById(req.params.id, req.body);
    console.log(updatedUser);
    if (updatedUser) {
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } else {
        res.status(404).json({ message: 'User not found' });
    }

}
   

const deleteUser = async (req, res) => {
    const deleteUser = await userService.deleteUserById(req.params.id);
    console.log(deleteUser);
    if(!deleteUser){ //if user not exist
        return res.status(404).json({ errors: ['User not found']});   
    }
    res.status(200).json({ message: ['User delete successfully']});
}





module.exports = {createUser, updateUser, deleteUser, getUserDetails};