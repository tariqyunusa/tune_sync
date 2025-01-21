const express = require('express');
const session = require('express-session')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const path = require('path')
const dotenv = require('dotenv')

// loading environment variables
dotenv.config()

const app = express()

// Middleware
app.use(express.json())

// session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// initializing passport
app.use(passport.initialize())
app.use(passport.session())

// auth routes
app.use('/auth', authRoutes)

// home route
app.get('/', (req, res) => {
    res.send('welcome to tune sync backend')
})

// start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})