const { getAllSkillsFromDB, getAllUserSkillsFromDB, getSkillFromDB, getAllRequestSkillsFromDB } = require("../repository/skill.repository");

async function getAllSkillsService() {
    return await getAllSkillsFromDB();
}

async function getSkillService(skillId) {
    return await getSkillFromDB(skillId);
}

async function getAllUserSkillsService(userId) {
    return await getAllUserSkillsFromDB(userId);
}

async function getAllRequestSkillsService(requestId) {
    return await getAllRequestSkillsFromDB(requestId);
}

module.exports = {
    getAllSkillsService,
    getSkillService,
    getAllUserSkillsService,
    getAllRequestSkillsService
}