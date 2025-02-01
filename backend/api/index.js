const express = require('express');
const authRoutes = require('./auth');  
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  


// Home route
app.get('/api', (req, res) => {
    res.send('Welcome to Tune Sync Backend');
});

// Export the Express app (Vercel auto-detects this as an API function)
module.exports = app;
