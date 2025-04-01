// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Route for user registration
router.post('/register', UserController.registerUser);

// Route for user login
router.post('/login', UserController.loginUser);

module.exports = router;