const axios = require('axios');
const qs = require('qs')
const dotenv = require('dotenv');

// loading environment variables
dotenv.config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const SCOPES = 'playlist-modify-public playlist-modify-private user-library-read user-read-email user-read-private';

const getAuthURL = () => {
    return `https://accounts.spotify.com/authorize?${qs.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        scope: SCOPES,
    })}`;
};



const getAccessToken = async (code) => {
    try {
        const tokenResponse = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify({
                code,
                redirect_uri: REDIRECT_URI, 
                grant_type: 'authorization_code',
            }),
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return tokenResponse.data;
    } catch (error) {
        console.error('There was an error exchanging access token:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
        });
        throw new Error('Failed to exchange access token');
    }
};


const refreshAccessToken = async (refresh_token) => {
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify({
                grant_type: 'refresh_token',
                refresh_token,
            }),
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error refreshing access token:', error.response?.data || error.message);
        throw new Error('Failed to refresh access token');
    }
};

const getUserData = async (access_token) => {
    try {
        const userData = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return userData.data;
    } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
        throw new Error('Failed to fetch user data');
    }
};

module.exports = {
    getAuthURL,
    getAccessToken,
    refreshAccessToken,
    getUserData,
};
