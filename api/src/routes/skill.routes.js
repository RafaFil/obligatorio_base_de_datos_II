const { Router } = require('express');
const { validateJWT } = require('../middlewares/validateJWT.middleware');
const { getAllSkills, getSkill, getAllUserSkills, getAllRequestSkills, addSkillToUser, editSkillUser } = require('../controllers/skill.controller');
const { validateBody } = require('../middlewares/validateBody.middleware');

const BASE_ROUTE = '/skills'
const skillsRouter = Router();

skillsRouter.get(`${BASE_ROUTE}`, async (req, res) => {
    return getAllSkills(req, res);
});

skillsRouter.get(`${BASE_ROUTE}/:skillId`, async (req, res) => {
    return getSkill(req, res);
});

skillsRouter.get(`${BASE_ROUTE}/user/:userId`, async (req, res) => {
    return getAllUserSkills(req, res);
});

skillsRouter.get(`${BASE_ROUTE}/request/:requestId`, async (req, res) => {
    return getAllRequestSkills(req, res);
});

skillsRouter.post(`${BASE_ROUTE}/addSkill`, validateBody, validateJWT, async (req,res) => {
    return addSkillToUser(req,res);
})

skillsRouter.put(`${BASE_ROUTE}/editSkillLevel`, validateBody, validateJWT, async (req, res) => {
    return editSkillUser(req,res);
})

module.exports = skillsRouter;



