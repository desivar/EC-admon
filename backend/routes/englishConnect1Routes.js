const express = require('express');
const router = express.Router();
const englishConnect1Controller = require('../controllers/englishConnect1Controller');

// Routes for EnglishConnect 1, nested under /api/students/:studentId
router.post('/:studentId/ec1/attendance', englishConnect1Controller.checkEC1Attendance);
router.post('/:studentId/ec1/homework', englishConnect1Controller.checkEC1Homework);

// You might add other routes here later
// router.get('/:studentId/ec1/progress', englishConnect1Controller.getEC1Progress);

// You can keep or remove this test route
router.get('/:studentId/ec1/register', (req, res) => {
    const studentId = req.params.studentId;
    res.send(`Hit the register GET route for student ID: ${studentId} (EC1)!`);
});

module.exports = router;