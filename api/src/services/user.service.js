const { User } = require('../entities/user.entity')

async function getAllUsersService() {
    return [new User("Baby dont","Hurt me",200), new User("Brandon","Gosling",450)];
}

module.exports = {
    getAllUsersService
}