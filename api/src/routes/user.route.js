const { Router } = require('express');
const { getAllUsers, registerUser, authUser, renewToken } = require('../controllers/user.controller')
const { validateBody } = require('../middlewares/validateBody.middleware')
const { validateJWT } = require('../middlewares/validateJWT.middleware')

const BASE_ROUTE = '/user'
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


module.exports = userRouter;



