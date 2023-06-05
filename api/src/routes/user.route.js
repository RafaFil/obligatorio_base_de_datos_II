const { Router } = require('express');
const { getAllUsers, registerUser, authUser } = require('../controllers/user.controller')
const { validateBody } = require('../middleware/validateBody.middleware')

const BASE_ROUTE = '/user'
const userRouter = Router();

userRouter.get(BASE_ROUTE, getAllUsers);

//get a user by credentials
userRouter.post(`${BASE_ROUTE}/auth`, authUser);

//post a user
userRouter.post(`${BASE_ROUTE}/register`, validateBody, async (req, res) => {
    return registerUser(req,res);
});

module.exports = userRouter;



