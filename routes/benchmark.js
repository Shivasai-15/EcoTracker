const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Database connection (update with your credentials)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql@123', // Replace with your MySQL password
    database: 'user_auth' // Replace with your database name
});

// GET route to fetch benchmarking data
router.get('/', (req, res) => {
    const query = `
        SELECT 
            timestamp, 
            energyConsumption, 
            fuelUsage, 
            coalProduction, 
            transportationDistance 
        FROM formdata 
        ORDER BY timestamp DESC
        LIMIT 10
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
    
        res.json(results);
    });
    
});

module.exports = router;
