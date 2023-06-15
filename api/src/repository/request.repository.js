const { pool } = require("../connection/db.conn")
const { dataResult, usedPKCode } = require("./data.repository")

const getRequestsByUserIdDB = async function (UserId) {
    return (pool.query("SELECT "+ allParsed + ""))
}

allParsed = 

module.exports = {
    getRequestsByUserIdDB
}