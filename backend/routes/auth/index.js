const express = require('express')
const spotifyAuth = require('./spotify')
const dotenv = require('dotenv')

// load environment variables
dotenv.config()

const router = express.Router()

// redirecting to spotify auth page
router.get('/login', (req, res) => {
    const AuthURL = spotifyAuth.getAuthURL()
    res.redirect(AuthURL)
})

// handle callback from spotify and exchange auth code for access token
router.get('/callback', async (req, res) => {
    const {code} = req.query

    if(!code) {
        return res.status(400).json({error: 'Authorization code missing'})
    }

    try{
        const tokenData = await spotifyAuth.getAccessToken(code)
        const {access_token, refresh_token, expires_in} = tokenData

        res.json({
            access_token,
            refresh_token,
            expires_in
        })
    }catch(error) {
        console.error("error during callback", error)
        res.status(500).json({error: 'failed to autheticate with spotify'})
    }
})

router.post('/refresh_token', async (req, res) => {
    const {refresh_token} = req.body

    try{
        const newAccessToken = await spotifyAuth.refreshAccessToken(refresh_token)
        res.json({access_token: newAccessToken})
    }catch(error) {
        console.error("error during token refresh", error)
        res.status(500).json({error: 'failed to refresh token'})
    }
})

router.get('/me', async (req, res) => {
    const {access_token} = req.query
    try{
        const userData = await spotifyAuth.getUserData(access_token)
        res.json(userData)
    }catch(error) {
        console.error("error during fetching user data", error)
        res.status(500).json({error: 'failed to fetch user data'})
    }
})

module.exports = router