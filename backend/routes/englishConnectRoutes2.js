// backend/routes/englishConnect1Routes.js
const express = require('express');
const router = express.Router();
const englishConnect1Controller = require('../controllers/englishConnect1Controller');

// Example routes for EnglishConnect 1
router.post('/attendance', englishConnect1Controller.checkAttendance);
router.post('/homework', englishConnect1Controller.checkHomework);
// Add other routes as needed (e.g., for getting lessons)
// router.get('/lessons', englishConnect1Controller.getLessons);

module.exports = router;