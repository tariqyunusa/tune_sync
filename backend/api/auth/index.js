const express = require('express');
const { getAuthURL, getAccessToken, getUserData } = require('./spotify');
const router = express.Router();

// Redirect user to Spotify authorization page
router.get('/', (req, res) => {
    const authURL = getAuthURL();
    res.redirect(authURL);
});

// Spotify callback
router.get('/callback', async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.status(400).json({ error: 'Missing authorization code' });
        }

        const tokenData = await getAccessToken(code);
        const userData = await getUserData(tokenData.access_token);

        // Redirect to frontend with token
    } catch (error) {
        console.error('Error in /auth/callback:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
