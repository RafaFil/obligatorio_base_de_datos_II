const { Router } = require('express');
const { getRequestsByUserDO, getRequestById, getQuestionsFromRequest, createRequest, createQuestion, answerQuestion, isRequestActive, getRequests, deleteRequest } = require("../controllers/request.controller");
const { validateJWT } = require('../middlewares/validateJWT.middleware');
const { validateBody } = require('../middlewares/validateBody.middleware')

const BASE_ROUTE = '/requests';
const requestRouter = Router();

requestRouter.use(BASE_ROUTE,validateJWT);

requestRouter.get(`${BASE_ROUTE}`, async (req,res) => {
    return getRequests(req,res);
})

requestRouter.get(`${BASE_ROUTE}/userDO/:userId`, async (req,res) =>{
    return getRequestsByUserDO(req,res);
});

requestRouter.get(`${BASE_ROUTE}/withId/:requestId`, async (req,res) => {
    return getRequestById(req, res);
})

requestRouter.get(`${BASE_ROUTE}/:requestId/questions`, async (req,res) => {
    return getQuestionsFromRequest(req,res);
})

requestRouter.post(`${BASE_ROUTE}/create`,validateBody,async (req,res) =>{
    return createRequest(req,res);
})

requestRouter.post(`${BASE_ROUTE}/addQuestion`,validateBody,async (req,res) =>{
    return createQuestion(req,res);
})

requestRouter.put(`${BASE_ROUTE}/answerQuestion`,validateBody,async (req,res) =>{
    return answerQuestion(req,res);
})

requestRouter.get(`${BASE_ROUTE}/:requestId/isActive`, async (req,res) =>{
    return isRequestActive(req,res);
})

requestRouter.delete(`${BASE_ROUTE}/delete/:requestId`, async (req,res) =>{
    return deleteRequest(req,res);
})

module.exports = requestRouter;



