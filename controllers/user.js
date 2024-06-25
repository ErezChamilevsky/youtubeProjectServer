const userService = require('../services/user');


const getUserDetails = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    // check if user exist
    if(!user){
        return res.status(404).json({ errors: ['User not found']});
    }
    res.json(user);
}




const updateUser = async (req, res) => {
    const updatedUser = await userService.updateUserById(req.params.id, req.body);
    if (updatedUser) {
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } else {
        res.status(404).json({ message: 'User not found' });
    }

}
   

const deleteUser = async (req, res) => {
    const deleteUser = userService.deleteUserById(req.params.id);
    if(!deleteUser){ //if user not exist
        return res.status(404).json({ errors: ['User not found']});   
    }
    res.status(200).json({ message: ['User delete successfully']});
}





module.exports = {updateUser, deleteUser, getUserDetails};