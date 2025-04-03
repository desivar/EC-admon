const express = require('express');
const router = express.Router();
const englishConnect2Controller = require('../controllers/englishConnect2Controller');

router.post('/:studentId/attendance', englishConnect2Controller.checkEC2Attendance);
router.post('/:studentId/homework', englishConnect2Controller.checkEC2Homework);

module.exports = router;