const { getAllFriendsDB, addFriendshipDB } = require("../repository/friend.repository")

const getAllFriendsService = async(userId) => {
    return await getAllFriendsDB(userId);
}

const addFriendshipService = async(user1Id, user2Id) => {
    return await addFriendshipDB(user1Id, user2Id);
}

module.exports = {
    getAllFriendsService,
    addFriendshipService
}