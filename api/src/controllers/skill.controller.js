const { Skill, userSkill, requiredSkill } = require("../entities/skills.entity");
const { getAllSkillsService, getAllUserSkillsService, getSkillService, getAllRequestSkillsService } = require("../services/skill.service");

const getAllSkills = async (req, res) => {
    getAllSkillsService().then( skills => {
        if(skills.success && skills.data){
            return res.status(200).json({
                success: true,
                data: skills.data
            });}
        else if (skills.success){
            return res.status(204).json({
                success: true,
                data: skills.data
            });
        } else{
            return res.status(400).json({
                success: false,
                data: skills.message
            }); 
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Internal server error.`
        });
    });
}

const getSkill = async (req, res) => {
    getSkillService(req.params['skillId']).then( skills => {
        if(skills.success && skills.data){
            return res.status(200).json({
                success: true,
                data: skills.data
            });}
        else if (skills.success){
            return res.status(204).json({
                success: true,
                data: skills.data
            });
        } else{
            return res.status(400).json({
                success: false,
                data: skills.message
            }); 
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Internal server error.`
        });
    });
}

const getAllUserSkills = async (req, res) => {
    getAllUserSkillsService(req.params['userId']).then( skills => {
        if(skills.success && skills.data){
            return res.status(200).json({
                success: true,
                data: skills.data
            });}
        else if (skills.success){
            return res.status(204).json({
                success: true,
                data: skills.data
            });
        } else{
            return res.status(400).json({
                success: false,
                data: skills.message
            }); 
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Internal server error.`
        });
    });
}

const getAllRequestSkills = async (req, res) => {
    getAllRequestSkillsService(req.params['requestId']).then( skills => {
        if(skills.success && skills.data){
            return res.status(200).json({
                success: true,
                data: skills.data
            });}
        else if (skills.success){
            return res.status(204).json({
                success: true,
                data: skills.data
            });
        } else{
            return res.status(400).json({
                success: false,
                data: skills.message
            }); 
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Internal server error.`
        });
    });
}


const addSkillToUser = async ( req , res) => {

    const { skillId, skillName, skillLvl } = req.body;

    if (!skillId || !skillName || !skillLvl || !req.username) {
        return res.status(400).json({
            success: false,
            message: 'missing fields in body'
        });
    }

    const newskill = new userSkill(skillId, skillName, req.username, skillLvl);

    addSkillToUserService(newskill).then ( result => {

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }
        return res.status(200).json({
            success: true,
            data: result.data
        });
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Internal server error.`
        });
    })
}

module.exports = {
    getAllSkills,
    getSkill,
    getAllUserSkills,
    getAllRequestSkills
}