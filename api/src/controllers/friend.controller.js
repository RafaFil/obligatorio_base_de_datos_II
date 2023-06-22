const { getAllFriendsService, addFriendshipService } = require("../services/friend.service")

const getAllFriends = async (req, res) => {

    getAllFriendsService(req.username).then( friendships => {
        if(friendships.success && friendships.data){
            return res.status(200).json({
                success: true,
                data: friendships.data
            });}
        else if (friendships.success){
            return res.status(204).json({
                success: true,
                data: friendships.data
            });
        } else{
            return res.status(400).json({
                success: false,
                data: "Intente de nuevo"
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

const addFriendship = async ( req , res) => {

    const { otherUserId } = req.body;

    if (!otherUserId || !req.username) {
        return res.status(400).json({
            success: false,
            message: 'missing fields in body'
        });
    }

    addFriendshipService(req.username, otherUserId).then ( result => {

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "No se pudo crear la amistad"
            });
        }
        return res.status(200).json({
            success: true,
            data: result.data
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

module.exports = {
    getAllFriends,
    addFriendship
}