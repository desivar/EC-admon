const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for user registration (account creation)
router.post('/register', userController.registerUser); // This is the crucial line

// You can keep this GET route for testing if you want
router.get('/register', (req, res) => {
    res.send('Hit the register GET route!');
});

module.exports = router;