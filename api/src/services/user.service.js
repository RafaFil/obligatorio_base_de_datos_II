const { User } = require('../entities/user.entity')
const  userRepository = require('../repository/user.repository')
const bcrypt = require('bcrypt')

async function getAllUsersService() {
    return await userRepository.getAllUsersFromDB();
}

const register = async (user, pass) => {

    let hashedpwd = await bcrypt.hash(pass, 10)

    return userRepository.insertNewUser(user, hashedpwd);
}

const auth = async (DO, pass) => {
    let user = (await userRepository.getUserCreds(DO));

    if(user.success){
        if(await bcrypt.compare(pass, user.data.hashpwd)){
            return await userRepository.getUserByDOfromDB(DO);
        } else{
            return {success : false}
        }
    }
    return null;
}

const findByDO = async (DO) => {
    return await userRepository.getUserByDOfromDB(DO);
}

module.exports = {
    getAllUsersService,
    register,
    auth,
    findByDO
}