const { User } = require('../entities/user.entity');
const { getAllUsersService, register, auth, findByDO } = require('../services/user.service')
const { generateJWT } = require('../helpers/jwt.helper');
const { checkDO } = require('../helpers/ci.helper');

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
                data: "No se pudo encontrar usuarios"
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
                data: "No se pudo encontrar el usuario"
            }); 
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "INTERNAL ERROR"
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

    if(!checkDO(DO)){
        return res.status(400).json({
            success: false,
            message: 'DO is not correct'
        });
    }

    const user = new User(DO, name, last_name);

    register(user, password).then ( user => {

        if (!user.success) {
            return res.status(400).json({
                success: false,
                message: "No se pudo registrar el usuario"
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
    const user = await findByDO(req.username);

    if (!user.success) {
        return res.status(404).json({
            success: false,
            message: `No user was found for username ${DO}`
        });
    }
    
    const token = await generateJWT( req.username, user.name );

    return res.status(200).json({
        success: true,
        data: {
            user : user.data,
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