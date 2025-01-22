const express = require('express');
const spotifyAuth = require('./spotify');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const router = express.Router();

// Redirecting to Spotify auth page
router.get('/login', (req, res) => {
    const AuthURL = spotifyAuth.getAuthURL();
    res.redirect(AuthURL);
});

// Handle callback from Spotify and exchange auth code for access token
router.get('/callback', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'Authorization code missing' });
    }

    console.log('Received authorization code:', code);

    try {
        const tokenData = await spotifyAuth.getAccessToken(code);
        const { access_token, refresh_token, expires_in } = tokenData;

        console.log('Access token obtained:', {
            access_token,
            refresh_token,
            expires_in,
        });

        res.json({
            access_token,
            refresh_token,
            expires_in,
        });
    } catch (error) {
        console.error('Error during callback:', {
            message: error.message,
            response: error.response?.data,
        });
        res.status(500).json({ error: 'Failed to authenticate with Spotify' });
    }
});


// Refresh access token
router.post('/refresh_token', async (req, res) => {
    const { refresh_token } = req.body;

    try {
        const newAccessToken = await spotifyAuth.refreshAccessToken(refresh_token);
        res.json({ access_token: newAccessToken });
    } catch (error) {
        console.error('Error during token refresh:', error);
        res.status(500).json({ error: 'Failed to refresh token' });
    }
});

// Get user data
router.get('/me', async (req, res) => {
    const { access_token } = req.query;
    try {
        const userData = await spotifyAuth.getUserData(access_token);
        res.json(userData);
    } catch (error) {
        console.error('Error during fetching user data:', error);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
});

module.exports = router;
