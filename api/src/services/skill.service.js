const { userSkill } = require("../entities/skills.entity")
const { getAllSkillsFromDB, getAllUserSkillsFromDB, getSkillFromDB, getAllRequestSkillsFromDB, addSkillToUserInDB, editSkillLevelDB } = require("../repository/skill.repository");

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
    return await addSkillToUserInDB(newUserSkill.id, newUserSkill.lvl, newUserSkill.userId)
}

async function editUserSkillLvlService(newSkillLvl){

    return await editSkillLevelDB(newSkillLvl.userId, newSkillLvl.id, newSkillLvl.lvl);
}

module.exports = {
    getAllSkillsService,
    getSkillService,
    getAllUserSkillsService,
    getAllRequestSkillsService,
    addSkillToUserService,
    editUserSkillLvlService
}