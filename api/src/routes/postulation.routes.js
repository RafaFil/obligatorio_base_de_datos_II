const { Router } = require('express');
const { validateBody } = require('../middlewares/validateBody.middleware')
const { validateJWT } = require('../middlewares/validateJWT.middleware');
const { getRequestPostulations, getFullPostulationtById, deletePostulationById, applyToRequest } = require('../controllers/postulation.controller')

const BASE_ROUTE = '/postulations'
const postulationsRouter = Router();
postulationsRouter.use(BASE_ROUTE, validateJWT)

postulationsRouter.get(`${BASE_ROUTE}/request/:requestId`, async (req, res) => {
    return getRequestPostulations(req, res);
});

postulationsRouter.get(`${BASE_ROUTE}/:id`, async (req, res) => {
    return getFullPostulationtById(req, res)
});

postulationsRouter.delete(`${BASE_ROUTE}/:id`, async (req, res) => {
    return deletePostulationById(req, res)
});

postulationsRouter.post(`${BASE_ROUTE}/apply`, validateBody, async (req, res) => {
    return applyToRequest(req,res);
});



module.exports = postulationsRouter;



