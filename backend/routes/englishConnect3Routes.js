const express = require('express');
const router = express.Router();
const englishConnect3Controller = require('../controllers/englishConnect3Controller');

router.post('/:studentId/attendance', englishConnect3Controller.checkEC3Attendance);
router.post('/:studentId/homework', englishConnect3Controller.checkEC3Homework);

module.exports = router;