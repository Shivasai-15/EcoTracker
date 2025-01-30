const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql@123',
    database: 'user_auth',
    connectTimeout: 60000
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// POST route to save data to the database
router.post('/data', (req, res) => {
    const { energyConsumption, fuelUsage, coalProduction, transportationDistance } = req.body;

    const query = `
        INSERT INTO formdata(energyConsumption, fuelUsage, coalProduction, transportationDistance)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [energyConsumption, fuelUsage, coalProduction, transportationDistance], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ error: 'Failed to save data' });
        }
        res.status(200).json({ message: 'Data successfully stored' });
    });
});

module.exports = router;
