const { Skill, userSkill, requiredSkill } = require("../entities/skills.entity");
const { getAllSkillsService, getAllUserSkillsService, getSkillService, getAllRequestSkillsService, addSkillToUserService, editUserSkillLvlService } = require("../services/skill.service");

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
                data: 'No se pudieron recuperar habilidades'
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
                data: "No se pudo hallar la habilidad solicitada"
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
                data: 'No se hallo al usuario'
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
                data: "No se hallo la solicitud dada"
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

    const { id, name, lvl } = req.body;

    if (!id || !name || !lvl ) {
        return res.status(400).json({
            success: false,
            message: 'missing fields in body'
        });
    }

    if (!req.username) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    const newskill = new userSkill(id, name, req.username, lvl);

    addSkillToUserService(newskill).then ( result => {

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: 'no se pudo agregar la habilidad'
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

const editSkillUser = async ( req , res) => {

    const { id, lvl } = req.body;

    if (!id || !lvl ) {
        return res.status(400).json({
            success: false,
            message: 'missing fields in body'
        });
    }

    if (!req.username) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    const newlvl = new userSkill(id,"name", req.username, lvl);
    editUserSkillLvlService(newlvl).then ( result => {

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el nivel'
            });
        }
        if(result.data){
            return res.status(200).json({
                success: true,
                data: result.data
            });
        }
        return res.status(204).json({
            success: true,
            data: undefined
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
    getAllRequestSkills,
    addSkillToUser,
    editSkillUser
}