const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

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

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html')); // Serve sign-up page first
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // Simulate signup (without database)
    console.log(`User signed up with Username: ${username} and Password: ${password}`);
    res.sendFile(path.join(__dirname, 'views', 'login.html')); // Redirect to login page
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Simulate login (without database)
    console.log(`User login attempt with Username: ${username} and Password: ${password}`);
    
    // For simplicity, we'll assume the credentials are always valid
    res.sendFile(path.join(__dirname, 'views', 'home.html')); // Redirect to home page on successful login
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
    console.log(`Booking confirmed with ID: ${bookingId}`);
    res.sendFile(path.join(__dirname, 'views', 'confirmation.html'));
});

// Server Listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
