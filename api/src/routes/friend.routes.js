const { Router } = require('express');
const { getAllFriends, addFriendship } = require('../controllers/friend.controller')
const { validateBody } = require('../middlewares/validateBody.middleware')
const { validateJWT } = require('../middlewares/validateJWT.middleware');

const BASE_ROUTE = '/friends'
const friendsRouter = Router();

friendsRouter.get(BASE_ROUTE, validateJWT, (req, res) => {
    return getAllFriends(req,res)
});

friendsRouter.post(`${BASE_ROUTE}/addFriend`, validateBody, validateJWT, async (req, res) => {
    return addFriendship(req,res);
});


module.exports = friendsRouter;



