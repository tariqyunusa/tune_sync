const axios = require('axios');

async function addTracksToPlaylist(accessToken, playlistId, trackUris) {
    try {
        const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            uris: trackUris
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to add tracks: ' + error.message);
    }
}

function extractPlaylistIdFromUrl(playlistUrl) {
    const regex = /playlist\/([a-zA-Z0-9]+)/;
    const match = playlistUrl.match(regex);
    return match ? match[1] : null;
}

module.exports = { addTracksToPlaylist, extractPlaylistIdFromUrl };
