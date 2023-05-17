const { getAllUsersService } = require('../services/user.service')

const getAllUsers = async (req, res) => {
    getAllUsersService().then( users => {
        
        return res.status(200).json({
            success: true,
            data: users
        });
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Internal server error.`
        });
    });
}

module.exports = {
    getAllUsers
}