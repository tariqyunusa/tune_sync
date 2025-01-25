const express = require("express")
const axios = require("axios")
const router = express.Router()
const dotenv = require('dotenv')

dotenv.config()

router.get('/search', async (req, res) => {
    const {query} = body.query
    const API_KEY = process.env.YOUTUBE_API_KEY
    
})