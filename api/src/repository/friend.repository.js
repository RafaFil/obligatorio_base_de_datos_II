const { pool } = require("../connection/db.conn")
const { dataResult, usedPKCode } = require("./data.repository")

const allUsersPreviewsParsed = "u.ci AS do, u.nombre AS name, u.apellido AS lastName, u.confirmada_identidad AS verified "

const getAllFriendsDB = async function (userId) {
    return ((pool.query(`SELECT *
    FROM 
    (SELECT ${allUsersPreviewsParsed} FROM amistades a INNER JOIN usuarios u ON u.ci = a.usuario2_ci
    WHERE a.usuario1_ci = $1) as friends1
    UNION
    (SELECT ${allUsersPreviewsParsed} FROM amistades a INNER JOIN usuarios u ON u.ci = a.usuario1_ci
    WHERE a.usuario2_ci = $1
    )`,[userId])).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows)
        } else {
            return new dataResult(true, null, 204)
        }
    }))
}

const addFriendshipDB = async function (user1Id, user2Id) {
    return (pool.query(`INSERT INTO amistades(usuario1_ci, usuario2_ci)
        VALUES($1, $2) RETURNING *;`,
        [user1Id, user2Id]))
        .then(res => {
            if (res.rows.length > 0) {
                return new dataResult(true, res.rows[0])
            } else {
                return new dataResult(true, null, 204)
            }
        }).catch(err => {
            if(err.code === usedPKCode || err.code === "P0001"){
                return new dataResult(false, null, err.code, "Esa amistad ya está registrada")
            }
            throw err
        })
}

// formatea un " * "

module.exports = {
    getAllFriendsDB,
    addFriendshipDB
}