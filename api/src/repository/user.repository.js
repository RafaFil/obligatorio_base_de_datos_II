const {pool} = require("../connection/db.conn")

const getAllUsersFromDB = async function(){
    return (await pool.query("SELECT * FROM usuarios")).rows
}

module.exports = {
    getAllUsersFromDB
}