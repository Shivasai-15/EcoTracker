const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Database connection (without dotenv)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql@123',
    database: 'user_auth',
    connectTimeout: 60000
});

// GET route to fetch emissions data
router.get('/analytics', (req, res) => {
    const query = `
        SELECT timestamp, energyConsumption, fuelUsage, coalProduction, transportationDistance
        FROM formdata
        ORDER BY timestamp ASC;
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
