const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Ensure that your CSS and other static files are served
app.use(session({
    secret: 'yourSecretKey', // Change this to a secure key
    resave: false,
    saveUninitialized: true
}));

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your actual MySQL username
    password: '', // Replace with your actual MySQL password
    database: 'bus_booking' // Replace with your database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html')); // Serve sign-up page first
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // Insert user into database (assuming you have a users table)
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error during signup:', err);
            return res.status(500).send('Error during signup');
        }
        res.sendFile(path.join(__dirname, 'views', 'login.html')); // Redirect to login page
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check user credentials (you need to handle this according to your authentication method)
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('Invalid credentials'); // Authentication failed
        }
        // If authentication is successful, redirect to home
        res.sendFile(path.join(__dirname, 'views', 'home.html'));
    });
});

app.get('/buses', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'buses.html'));
});

app.post('/select-seat', (req, res) => {
    // Process seat selection and redirect to personal information page
    res.sendFile(path.join(__dirname, 'views', 'personal_info.html'));
});

app.post('/personal-info', (req, res) => {
    // Store personal info as needed (consider using session)
    req.session.personalInfo = req.body; // Store in session for later use
    res.sendFile(path.join(__dirname, 'views', 'payment.html'));
});

app.post('/confirmation', (req, res) => {
    // Here you would finalize the booking (you can use session info if needed)
    const bookingId = Math.floor(Math.random() * 1000000); // Generate a mock booking ID
    res.sendFile(path.join(__dirname, 'views', 'confirmation.html'));
});

// Server Listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
