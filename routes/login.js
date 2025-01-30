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

// POST route to handle login
router.post('/', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM signup WHERE username = ?';

    db.query(query, [username], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found. Please sign up first.' });
        }

        const user = results[0];

        // Compare provided password with stored one
        if (password === user.password) {
            res.status(200).json({ message: 'Login successful.' });
        } else {
            res.status(401).json({ error: 'Incorrect password. Please try again.' });
        }
    });
});

module.exports = router;
