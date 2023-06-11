const {pool} = require("../connection/db.conn")

const getAllUsersFromDB = async function(){
    const result = (await pool.query(selectAllParsed + "FROM usuarios"))

    return result.rows.length > 0 ? result.rows : null
}

const getUserByDOfromDB = async function(DO){
    const result = (await pool.query(selectAllParsed +"FROM usuarios u WHERE u.ci = $1 ;", [DO]))

    return result.rows.length === 1 ? result.rows[0] : null
}

const insertNewUser = async function(newUser, hashPwd){
    const result = (await pool.query("INSERT INTO usuarios(ci, nombre, apellido, dispuesto_ayudar, confirmada_identidad, hashpwd)" +
                    "VALUES($1, $2, $3, $4, $5, $6)  RETURNING *;", 
                    [newUser.DO, newUser.name, newUser.lastName, newUser.willHelp, newUser.verified, hashPwd]))

    return result.rows.length > 0 ? result.rows[0] : null
}

// formatea un " SELECT * "
const selectAllParsed = "SELECT ci AS do, nombre AS name, apellido AS lastName, dispuesto_ayudar AS willHelp, confirmada_identidad AS verified "
module.exports = {
    getAllUsersFromDB,
    getUserByDOfromDB,
    insertNewUser
}