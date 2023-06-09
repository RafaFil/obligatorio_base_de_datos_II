const { pool } = require("../connection/db.conn")
const { dataResult, usedPKCode } = require("./data.repository")

// formatea un " * "
const ALLPARSED = "ayudante_ci AS userId, solicitud_id AS requestId, fecha AS dateOfPostulation, fue_aceptada AS wasAccepted "

const getSolicitantRequestHelper = async function (userId, requestId) {
    return pool.query
        (`SELECT *
        FROM solicitante_solicitud_ayudante 
        WHERE (helperid = $1 OR solicitantid = $1 ) AND requestid = $2;`,
        [userId, requestId]).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows)
        } else {
            return new dataResult(false, null, 204, "No postulation found")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    })
}

const getPostulationsOfRequest = async function (requestId) {
    return (pool.query(`SELECT ${ALLPARSED},  u.nombre AS username, u.apellido AS userlastname, u.confirmada_identidad AS verified
    FROM postulaciones p INNER JOIN usuarios u ON u.ci = p.ayudante_ci
    WHERE p.solicitud_id = $1 ;`, [requestId])).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows)
        } else {
            return new dataResult(true, null, 404, "No postulations found")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    }) 
}

const getPostulation = async function (helperId, requestId) {
    return (pool.query(`SELECT ${ALLPARSED} FROM postulaciones p 
    WHERE p.solicitud_id = $1 AND p.ayudante_ci = $2;`, [requestId, helperId])).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows[0])
        } else {
            return new dataResult(false, null, 404, "No postulation found")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    })
}

const getUsersPostulationsDB = async function (helperId) {
    return (pool.query(`SELECT ${ALLPARSED}, s.titulo AS title, s.descripcion AS description, u.nombre AS userName, u.apellido AS userLastName
    FROM postulaciones p INNER JOIN solicitudes_ayuda s ON s.id = p.solicitud_id INNER JOIN usuarios u ON s.solicitante_ci = u.ci
    WHERE p.ayudante_ci = $1;`, [helperId])).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows)
        } else {
            return new dataResult(true, null, 204, "No postulation found")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    })
}

const createPostulation = async function (postulation) {
    return (pool.query(`INSERT INTO postulaciones(ayudante_ci, solicitud_id, fecha, fue_aceptada)
        VALUES($1, $2, $3, $4)  RETURNING ${ALLPARSED};`,
        [postulation.userId, postulation.requestId, postulation.dateOfPostulation, postulation.wasAccepted ]))
        .then(res => {
            if (res.rows.length > 0) {
                return new dataResult(true, res.rows[0])
            } else {
                return new dataResult(true, null, 204)
            }
        }).catch(err => {
            if(err.code === usedPKCode){
                return new dataResult(false, null, err.code, "Ya se postuló para esta solicitud")
            }
            throw err
        })
}

const deletePostulation = async function (userId, requestId) {
    return (pool.query(`DELETE FROM postulaciones p 
        WHERE p.ayudante_ci = $1 AND p.solicitud_id = $2 RETURNING ${ALLPARSED} ;`,
        [userId, requestId]))
        .then(res => {
            if (res.rows.length > 0) {
                return new dataResult(true, res.rows[0])
            } else {
                return new dataResult(true, null, 204)
            }
        }).catch(err => {
            if(err.code === usedPKCode){
                return new dataResult(false, null, err.code, "Ya se postuló para esta solicitud")
            }
            throw err
        })
}

module.exports = {
    getSolicitantRequestHelper,
    getPostulation,
    getPostulationsOfRequest,
    createPostulation,
    getUsersPostulationsDB,
    deletePostulation
}