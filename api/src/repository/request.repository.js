const { pool } = require("../connection/db.conn");
const { dataResult } = require("./data.repository");
const { getAllFriendsRequestsBuilder, skillsQueryBuilder } = require("../helpers/request.helper")

requestAllParsed = "id, latitud as lat, longitud as lng, solicitante_ci as userDO, esta_activa as isActive, fue_resuelta as wasResolved, fecha_publicacion as dateOfPublishing, titulo as title, descripcion as description";
userAllParsed = "ci AS do, nombre AS name, apellido AS lastName, confirmada_identidad AS verified";
requestCommentsAllParsed = "usuario_id as userDO, solicitud_id as requestId, texto_pregunta as question, texto_respuesta as answer";
questionsAllParsed = "usuario_id as userDO, solicitud_id as id, texto_pregunta as question, texto_respuesta as answer";

const getRequestsByUserDO_DB = async function (UserId) {
    return (pool.query("SELECT " + requestAllParsed + " FROM solicitudes_ayuda sa WHERE sa.solicitante_ci = $1 ;", [UserId]).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows);
        }
        else {
            return new dataResult(false, null, 404, "No requests found")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    }));
}

const getRequestWithUserByRequestIdDB = async function (requestId) {
    return (pool.query("SELECT " + requestAllParsed + ", " + userAllParsed + " FROM solicitudes_ayuda sa INNER JOIN usuarios u ON sa.solicitante_ci = u.ci WHERE sa.id = $1", [requestId]).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows);
        } else {
            return new dataResult(false, null, 404, "No requests found")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    }));
}

const getQuestionsFromRequestDB = async function (requestId) {
    return (pool.query("SELECT " + questionsAllParsed + " FROM comentarios_solicitudes cs WHERE cs.solicitud_id = $1 ;", [requestId]).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows);
        }
        else {
            return new dataResult(false, null, 404, "No requests found")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    }));
}

const createRequestDB = async function (helpRequest) {
    return (pool.query('INSERT INTO solicitudes_ayuda(latitud,longitud,solicitante_ci,esta_activa,fue_resuelta,fecha_publicacion,titulo,descripcion) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', [helpRequest.lat, helpRequest.lng, helpRequest.userDO, helpRequest.isActive, helpRequest.wasResolved, helpRequest.dateOfPublishing, helpRequest.title, helpRequest.description]).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows);
        }
        else {
            return new dataResult(false, null, 400, "Request not added correctly.")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    }));
}

const createRequestSkillsDB = async function (requestSkills) {
    buildingQuery = skillsQueryBuilder(requestSkills);
    return pool.query(buildingQuery, requestSkills).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows);
        }
        else {
            return new dataResult(false, null, 400, "Request not added correctly.")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    });
}

const createRequestCommentDB = async function (reqComment) {
    return (pool.query(`INSERT INTO comentarios_solicitudes(usuario_id,solicitud_id,texto_pregunta,texto_respuesta) VALUES ($1,$2,$3,$4) RETURNING ` + requestCommentsAllParsed, [reqComment.userDO, reqComment.requestId, reqComment.question, reqComment.answer])).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows);
        }
        else {
            return new dataResult(false, null, 400, "Request Comment not added correctly.")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    });
}

const answerRequestCommentDB = async function (reqComment) {
    return (pool.query(`UPDATE comentarios_solicitudes cs\nSET texto_respuesta = $1\nWHERE cs.usuario_id = $2 AND cs.solicitud_id = $3 RETURNING ` + requestCommentsAllParsed, [reqComment.answer, reqComment.userDO, reqComment.requestId]).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows);
        }
        else {
            return new dataResult(false, null, 400, "Request Comment not added correctly.")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    }));
}

const isRequestActiveDB = async function (requestId) {
    return (pool.query(`SELECT esta_activa as isActive from solicitudes_ayuda sa WHERE sa.id = $1`, [requestId]).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows);
        }
        else {
            return new dataResult(false, null, 404, "Request not found.")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    }));
}

const getFriendsDB = async function (userId) {
    return (pool.query(`SELECT amigos.amigo
    FROM (
                SELECT usuario2_ci AS amigo
                FROM amistades
                WHERE usuario1_ci = $1
            UNION
                SELECT usuario1_ci AS amigo
                FROM amistades
                WHERE usuario2_ci = $1
        ) AS amigos
    UNION
        SELECT amigos_de_amigos.amigo
        FROM (
                SELECT usuario2_ci AS amigo
                FROM amistades
                WHERE usuario1_ci IN (
                        SELECT usuario2_ci
                        FROM amistades
                        WHERE usuario1_ci = $1
                    UNION
                        SELECT usuario1_ci
                        FROM amistades
                        WHERE usuario2_ci = $1
                )
                UNION
                SELECT usuario1_ci AS amigo
                FROM amistades
                WHERE usuario2_ci IN (
                        SELECT usuario2_ci
                        FROM amistades
                        WHERE usuario1_ci = $1
                    UNION
                        SELECT usuario1_ci
                        FROM amistades
                        WHERE usuario2_ci = $1
            )) AS amigos_de_amigos;`, [userId])).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows);
        }
        else {
            return new dataResult(false, null, 404, "User not found.")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    });
}

const getRequestsDB = async function (friendsArray) {
    queryFilter = getAllFriendsRequestsBuilder(friendsArray);
    return (pool.query(
        `SELECT sa.id, sa.titulo as title, sa.fecha_publicacion as dateOfPublishing, sa.latitud as lat, sa.longitud as lng, h.nombre as habilidad 
        FROM solicitudes_ayuda sa join habilidades_solicitudes hs on sa.id = hs.solicitud_id join habilidades h on hs.habilidad_id = h.id 
        ${queryFilter} AND sa.esta_activa = true ;`, friendsArray).then(res => {
            if (res.rows.length > 0) {
                return new dataResult(true, res.rows);
            }
            else {
                return new dataResult(false, null, 404, "Requests not Found.")
            }
        }).catch(err => {
            return new dataResult(false, null, err.code, err.message)
        }));
}

const deleteRequestDB = async function (requestId) {
    return (pool.query(`DELETE FROM solicitudes_ayuda sa WHERE sa.id = $1 RETURNING id`, requestId)).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows);
        }
        else {
            return new dataResult(false, null, 404, "Requests not Found.")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    });
}

module.exports = {
    getRequestsByUserDO_DB,
    getRequestWithUserByRequestIdDB,
    getQuestionsFromRequestDB,
    createRequestDB,
    createRequestSkillsDB,
    createRequestCommentDB,
    answerRequestCommentDB,
    isRequestActiveDB,
    getFriendsDB,
    getRequestsDB,
    deleteRequestDB
}