// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for user registration (account creation)
router.get('/register', (req, res) => {
    res.send('Hit the register GET route!');
});