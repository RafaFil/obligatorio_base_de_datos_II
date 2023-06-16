const { pool } = require("../connection/db.conn")
const { dataResult, usedPKCode } = require("./data.repository")

const getAllSkillsFromDB = async function () {
    return pool.query
        (`SELECT h.id, h.nombre AS name 
        FROM habilidades h`).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows)
        } else {
            return new dataResult(true, null, 204, "No Skills found")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    })
}

const getSkillFromDB = async function (skillId) {
    return pool.query
        (`SELECT h.id, h.nombre AS name 
        FROM habilidades h
        WHERE h.id = $1`, [skillId]).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows)
        } else {
            return new dataResult(true, null, 204, "No Skill found")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    })
}

const getAllUserSkillsFromDB = async function (userId) {
    return pool.query
        (`SELECT h.id, h.nombre AS name, hu.nivel AS lvl 
        FROM habilidades h INNER JOIN habilidades_usuarios hu ON hu.habilidad_id = h.id
        WHERE hu.user_ci = $1`, [userId]).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows[0])
        } else {
            return new dataResult(true, null, 204, "No Skills found")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    })
}

const getAllRequestSkillsFromDB = async function (requestId) {
    return pool.query
        (`SELECT h.id, h.nombre AS name, hs.nivel AS lvl 
        FROM habilidades h INNER JOIN habilidades_solicitudes hs ON hs.habilidad_id = h.id
        WHERE hs.solicitud_id = $1`, [requestId]).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows)
        } else {
            return new dataResult(true, null, 204, "No Required Skills found")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    })
}

const addSkillToUserInDB = async function (skillId, skillLvl, userId) {
    return pool.query
        (`INSERT INTO habilidades_usuario(user_ci, habilidad_id, nivel) 
        VALUES ($1, $2, $3) RETURNING id, nombre AS name, nivel AS lvl`, 
        [userId, skillId, skillLvl]).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows[0])
        } else {
            return new dataResult(true, null, 204, "No Skill Added")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    })
}

module.exports = {
    getAllSkillsFromDB,
    getSkillFromDB,
    getAllUserSkillsFromDB,
    getAllRequestSkillsFromDB,
    addSkillToUserInDB
}