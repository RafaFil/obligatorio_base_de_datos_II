const { Router } = require('express');
const { getRequestsByUserId } = require("../controllers/request.controller");
const { validateJWT } = require('../middlewares/validateJWT.middleware');

const BASE_ROUTE = '/request'
const requestRouter = Router();

requestRouter.use(BASE_ROUTE,validateJWT)

requestRouter.get(`${BASE_ROUTE}/userId/:userId`, async (req,res) =>{
    return getRequestsByUserId(req,res)
});

module.exports = requestRouter;



