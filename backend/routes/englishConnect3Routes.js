// backend/routes/englishConnect3Routes.js
const express = require('express');
const router = express.Router();
const englishConnect3Controller = require('../controllers/englishConnect3Controller');

// Example routes for EnglishConnect 3
router.post('/attendance', englishConnect3Controller.checkAttendance);
router.post('/homework', englishConnect3Controller.checkHomework);
// Add other routes as needed
// router.get('/lessons', englishConnect3Controller.getLessons);

module.exports = router;