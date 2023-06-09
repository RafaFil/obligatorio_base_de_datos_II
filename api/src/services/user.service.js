const { User } = require('../entities/user.entity')
const  userRepository = require('../repository/user.repository')

async function getAllUsersService() {
    return await userRepository.getAllUsersFromDB();
}

const register = async (user) => {
    return user;
}

const auth = async (DO, pass) => {
    
    if (DO==="11111111" && pass==="admin"){
        return new User("Brandon","Gosling",450);
    }
    return
}

const findByDO = async (DO) => {
    return new User("Brandon","Gosling",450);
}

module.exports = {
    getAllUsersService,
    register,
    auth,
    findByDO
}