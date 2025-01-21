const express = require('express');
const axios = require('axios');
const { addTracksToPlaylist, extractPlaylistIdFromUrl } = require('../utils/spotify');
const router = express.Router();

router.get('/', async (req, res) => {
    const { access_token } = req.query;
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: { Authorization: `Bearer ${access_token}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch playlists' });
    }
});

router.post('/add-tracks-from-url', async (req, res) => {
    const { access_token, targetPlaylistId, sourcePlaylistUrl } = req.body;
    try {
        const sourcePlaylistId = extractPlaylistIdFromUrl(sourcePlaylistUrl);
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${sourcePlaylistId}/tracks`, {
            headers: { Authorization: `Bearer ${access_token}` }
        });
        const trackUris = response.data.items.map(item => item.track.uri);
        const result = await addTracksToPlaylist(access_token, targetPlaylistId, trackUris);
        res.json({ message: 'Tracks added successfully', snapshot_id: result.snapshot_id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add tracks' });
    }
});

module.exports = router;
