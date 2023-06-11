const { pool } = require("../connection/db.conn")
const { dataResult, usedPKCode } = require("./data.repository")

const getAllUsersFromDB = async function () {
    return ((pool.query("SELECT " + allParsed + "FROM usuarios")).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows)
        } else {
            return new dataResult(true, null, 204)
        }
    }))
}

const getUserByDOfromDB = async function (DO) {
    return (pool.query("SELECT " + allParsed + "FROM usuarios u WHERE u.ci = $1 ;", [DO])).then(res => {
        if (res.rows.length > 0) {
            return new dataResult(true, res.rows[0])
        } else {
            return new dataResult(false, null, 404, "No user found")
        }
    }).catch(err => {
        return new dataResult(false, null, err.code, err.message)
    })
}

const insertNewUser = async function (newUser, hashPwd) {
    return (pool.query("INSERT INTO usuarios(ci, nombre, apellido, dispuesto_ayudar, confirmada_identidad, hashpwd)" +
        "VALUES($1, $2, $3, $4, $5, $6)  RETURNING " + allParsed + ";",
        [newUser.DO, newUser.name, newUser.lastName, newUser.willHelp, newUser.verified, hashPwd]))
        .then(res => {
            if (res.rows.length > 0) {
                return new dataResult(true, res.rows[0])
            } else {
                return new dataResult(true, null, 204)
            }
        }).catch(err => {
            if(err.code === usedPKCode){
                return new dataResult(false, null, err.code, "Esa CI ya está registrada")
            }
            throw err
        })
}

// formatea un " * "
const allParsed = "ci AS do, nombre AS name, apellido AS lastName, dispuesto_ayudar AS willHelp, confirmada_identidad AS verified "
module.exports = {
    getAllUsersFromDB,
    getUserByDOfromDB,
    insertNewUser
}