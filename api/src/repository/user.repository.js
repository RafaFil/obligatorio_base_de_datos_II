const {pool} = require("../connection/db.conn")

const getAllUsersFromDB = async function(){
    const result = (await pool.query(selectAllParsed + "FROM usuarios"))

    return result.rowCount > 0 ? result.rows : null
}

const getUserByDOfromDB = async function(DO){
    const result = (await pool.query(selectAllParsed +"FROM usuarios u WHERE u.ci = $1 ;", [DO]))

    return result.rowCount > 0 ? result.rows[0] : null
}

// formatea un " SELECT * "
const selectAllParsed = "SELECT ci AS do, nombre AS name, apellido AS lastName, dispuesto_ayudar AS willHelp, confirmada_identidad AS verified "
module.exports = {
    getAllUsersFromDB,
    getUserByDOfromDB
}