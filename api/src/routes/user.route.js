const { Router } = require('express');
const { getAllUsers } = require('../controllers/user.controller')

const BASE_ROUTE = '/user'
const userRouter = Router();

userRouter.get(BASE_ROUTE, getAllUsers);

module.exports = userRouter;



