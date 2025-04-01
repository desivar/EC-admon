// backend/routes/englishConnect2Routes.js
const express = require('express');
const router = express.Router();
const englishConnect2Controller = require('../controllers/englishConnect2Controller');

// Example routes for EnglishConnect 2
router.post('/attendance', englishConnect2Controller.checkAttendance);
router.post('/homework', englishConnect2Controller.checkHomework);
// Add other routes as needed
// router.get('/lessons', englishConnect2Controller.getLessons);

module.exports = router;