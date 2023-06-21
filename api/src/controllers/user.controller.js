const { User } = require('../entities/user.entity');
const { getAllUsersService, register, auth, findByDO } = require('../services/user.service')
const { generateJWT } = require('../helpers/jwt.helper');

const getAllUsers = async (req, res) => {
    getAllUsersService().then( users => {
        if(users.success && users.data){
            return res.status(200).json({
                success: true,
                data: users.data
            });}
        else if (users.success){
            return res.status(204).json({
                success: true,
                data: users.data
            });
        } else{
            return res.status(400).json({
                success: false,
                data: users.message
            }); 
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Internal server error.`
        });
    });
}

const getUserByDO = async (req, res) => {
    findByDO(req.params['id']).then( user => {
        if(user.success){
            return res.status(200).json({
                success: true,
                data: user.data
        });}
        else{
            return res.status(404).json({
                success: false,
                data: user.message
            }); 
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message ? err.message : "INTERNAL ERROR"
        });
    });
}

const registerUser = async ( { body } , res) => {

    const { DO, password, name, last_name } = body;

    if (!DO || !password || !name || !last_name) {
        return res.status(400).json({
            success: false,
            message: 'missing fields in body'
        });
    }

    const user = new User(DO, name, last_name);

    register(user, password).then ( user => {

        if (!user.success) {
            return res.status(400).json({
                success: false,
                message: user.message
            });
        }
        return res.status(200).json({
            success: true,
            data: user.data
        });
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Internal server error.`
        });
    })
}

const authUser = async (req, res) => {
    
    const { DO, password } = req.body;

    if ( !DO || !password ) {
        return res.status(400).json({
            success: false,
            message: `Bad request missing DO or Password`
        });
    }

    auth(DO, password).then(async (user) => {

        //user not found
        if ( !user ) {

            return res.status(404).json({
                success: false,
                message: 'User not Found'
            });
        }
        //wrong creds
        if ( !user.success ) {

            return res.status(400).json({
                success: false,
                message: 'Bad request, wrong DO or Password'
            });
        }

        const token = await generateJWT(DO, user.data.name);

        return res.status(200).json({
            success: true,
            data: {
                user: user.data,
                token : token
            }
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

// TODO
const renewToken = async (req, res) => {
    const { DO } = req;

    const user = await findByDO(DO);

    if (!user.data) {
        return res.status(404).json({
            success: false,
            message: `No user was found for username ${DO}`
        });
    }
    
    const token = await generateJWT( DO, user.name );

    return res.status(200).json({
        success: true,
        data: {
            user,
            token
        }
    });
}

module.exports = {
    getAllUsers,
    registerUser,
    authUser,
    renewToken,
    getUserByDO
}