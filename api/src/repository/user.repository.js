const {pool} = require("../connection/db.conn")

const getAllUsersFromDB = async function(){
    return (await pool.query("SELECT * FROM usuarios")).rows
}

const getUserByDOfromDB = async function(DO){
    return (await pool.query(selectAllParsed +"FROM usuarios u WHERE u.ci = $1 ;", [DO])).rows
}


const selectAllParsed = "SELECT ci AS do, nombre AS name, apellido AS lastName, dispuesto_ayudar AS willHelp, confirmada_identidad AS verified "
module.exports = {
    getAllUsersFromDB,
    getUserByDOfromDB
}