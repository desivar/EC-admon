// backend/routes/englishConnect2Routes.js
const express = require('express');
const router = express.Router();
const englishConnect2Controller = require('../controllers/englishConnect2Controller');

// Example routes for EnglishConnect 2
router.post('/attendance', englishConnect1Controller.checkAttendance);
router.post('/homework', englishConnect1Controller.checkHomework);
// Add other routes as needed (e.g., for getting lessons)
// router.get('/lessons', englishConnect1Controller.getLessons);
// You can keep this GET route for testing if you want
router.get('/register', (req, res) => {
        res.send('Hit the register GET route!');
    });
