// routes/signup.js
const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

// Database connection (without dotenv)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql@123',
    database: 'user_auth',
    connectTimeout: 60000
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// POST route to save signup data to the database
router.post('/', (req, res) => {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = `
        INSERT INTO signup (username, email, password)
        VALUES (?, ?, ?)
    `;

    db.query(query, [username, email, password], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ error: 'Failed to save signup data.' });
        }
        res.status(200).json({ message: 'Signup successful.' });
    });
});

module.exports = router;
