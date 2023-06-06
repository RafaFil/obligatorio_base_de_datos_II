const { User } = require('../entities/user.entity')

async function getAllUsersService() {
    return [new User("Baby dont","Hurt me",200), new User("Brandon","Gosling",450)];
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

module.exports = {
    getAllUsersService,
    register,
    auth
}