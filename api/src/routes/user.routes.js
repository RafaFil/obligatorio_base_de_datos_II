const { Router } = require('express');
const { getAllUsers, registerUser, authUser, renewToken, getUserByDO } = require('../controllers/user.controller')
const { validateBody } = require('../middlewares/validateBody.middleware')
const { validateJWT } = require('../middlewares/validateJWT.middleware');

const BASE_ROUTE = '/users'
const userRouter = Router();

userRouter.get(BASE_ROUTE, getAllUsers);

//get a user by credentials
userRouter.post(`${BASE_ROUTE}/auth`, authUser);

//post a user
userRouter.post(`${BASE_ROUTE}/register`, validateBody, async (req, res) => {
    return registerUser(req,res);
});

userRouter.get(`${BASE_ROUTE}/renew`, validateJWT, async (req, res) => {
    return renewToken(req, res);
});

userRouter.get(`${BASE_ROUTE}/withId/:id`, async (req, res) => {
    return getUserByDO(req, res)
});

module.exports = userRouter;



