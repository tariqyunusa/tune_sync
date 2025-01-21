const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const { access_token, query } = req.query; 
    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: { q: query, type: 'track', limit: 1 } 
        });
        res.json(response.data.tracks.items);
    } catch (error) {
        console.error('Error fetching tracks', error);
        res.status(500).json({ error: 'Failed to fetch tracks' });
    }
});

module.exports = router;
