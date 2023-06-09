import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'client',
    password: 'user',
    database: 'suppBuddyDB',
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})


module.exports = {
    pool
}