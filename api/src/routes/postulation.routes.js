const { Router } = require('express');
const { validateBody } = require('../middlewares/validateBody.middleware')
const { validateJWT } = require('../middlewares/validateJWT.middleware');

const BASE_ROUTE = '/postulations'
const userRouter = Router();

userRouter.get(BASE_ROUTE + "/:requestId", validateJWT, async (req, res) => {
    return getRequestPostulations(req, res);
});

userRouter.get(`${BASE_ROUTE}/:id`, validateJWT, async (req, res) => {
    return getFullPostulationtById(req, res)
});

userRouter.delete(`${BASE_ROUTE}/:id`, validateJWT, async (req, res) => {
    return deletePostulationById(req, res)
});

userRouter.post(`${BASE_ROUTE}/apply`, validateBody, validateJWT, async (req, res) => {
    return applyToRequest(req,res);
});



module.exports = userRouter;



