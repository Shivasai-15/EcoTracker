const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost', // Replace with your database host
    user: 'root',      // Replace with your MySQL username
    password: 'Mysql@123',      // Replace with your MySQL password
    database: 'user_auth', // Replace with your database name
    connectionLimit: 60000,
});

module.exports = pool;
