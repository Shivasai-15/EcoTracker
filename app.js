const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dataRoutes = require('./routes/data');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const analyticsRoute = require('./routes/analytics');
const benchmarkRoutes=require('./routes/benchmark');
const reductionRoutes = require('./routes/reduction-pathways');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'Website')));

// Route to serve test.html
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'Website', 'test.html'));
});

// Route to serve Eco.html
app.get('/Eco', (req, res) => {
    res.sendFile(path.join(__dirname, 'Website', 'Eco.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'Website', 'signup.html'));
});
app.get('/analytics', (req, res) => {
    res.sendFile(path.join(__dirname, 'Website', 'analytics.html'));
});
app.get('/benchmark',(req,res) =>
{
    res.sendFile(path.join(__dirname,'Website','benchmarking.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Website', 'login.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'Website', 'home.html'));
});
app.use('/api/signup', signupRoutes);

// API Route for handling data processing
app.use('/api', dataRoutes);
app.use('/api/login', loginRoutes);
app.use('/api', analyticsRoute);
app.use('/api/benchmark',benchmarkRoutes);
app.use('/api/reduction-pathways', reductionRoutes);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
