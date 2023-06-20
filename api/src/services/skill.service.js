const { getAllSkillsFromDB, getAllUserSkillsFromDB, getSkillFromDB, getAllRequestSkillsFromDB, addSkillToUserInDB } = require("../repository/skill.repository");

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

async function addSkillToUserService(newUserSkill) {
    return await addSkillToUserInDB(newUserSkill.skillId, newUserSkill.lvl, newUserSkill.userId)
}

module.exports = {
    getAllSkillsService,
    getSkillService,
    getAllUserSkillsService,
    getAllRequestSkillsService,
    addSkillToUserService
}