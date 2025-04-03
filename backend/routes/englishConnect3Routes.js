const express = require('express');
const router = express.Router();
const englishConnect1Controller = require('../controllers/englishConnect1Controller');

router.post('/:studentId/attendance', englishConnect1Controller.checkEC1Attendance);
router.post('/:studentId/homework', englishConnect1Controller.checkEC1Homework);

module.exports = router;