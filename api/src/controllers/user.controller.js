const { User } = require('../entities/user.entity');
const { getAllUsersService, register, auth, findByDO } = require('../services/user.service')
const { generateJWT } = require('../helpers/jwt.helper');

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

const registerUser = async ( { body } , res) => {

    const { DO, password, name, last_name } = body;

    if (!DO || !password || !name || !last_name) {
        return res.status(400).json({
            success: false,
            message: 'missing fields in body'
        });
    }

    const user = new User(name, last_name, DO);

    register(user).then ( user => {

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not created"
            });
        }
        return res.status(200).json({
            success: true,
            data: user
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
            message: `Bad request`
        });
    }

    auth(DO, password).then(async (user) => {

        //user not found
        if (!user) {

            return res.status(400).json({
                success: false,
                message: 'Bad request'
            });
        }

        const token = await generateJWT(DO, user.name);

        return res.status(200).json({
            success: true,
            data: {
                user: user,
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

    if (!user) {
        res.status(404).json({
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
    renewToken
}