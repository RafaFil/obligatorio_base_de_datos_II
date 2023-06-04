const { User } = require("./user.entity");

class Friendship {

    user;
    bonds;

    constructor(firstUser = new User("1", friends = [])){
        this.user = firstUser;
        this.bonds = new Set(friends);
    }

    static getFriends(ci){
        //queries for user and friends

        //returns user as head of friendshiptree
    }

    static makeTree(userCi){
        //makes a dictionary of structure key = userCi, value = array of friendsCi
        //and builds the tree

        //beware duplicates
    }
}

module.exports = {
    Friendship
}