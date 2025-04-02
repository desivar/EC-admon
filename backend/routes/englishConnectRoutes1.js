// backend/routes/englishConnect1Routes.js
const express = require('express');
const router = express.Router();
const englishConnect1Controller = require('../controllers/englishConnect1Controller');

// Example routes for EnglishConnect 1
router.post('/attendance', englishConnect1.checkAttendance);
router.post('/homework', englishConnect1.checkHomework);
// Add other routes as needed (e.g., for getting lessons)
// router.get('/lessons', englishConnect1Controller.getLessons);
// You can keep this GET route for testing if you want
router.get('/register', (req, res) => {
        res.send('Hit the register GET route!');
    });
