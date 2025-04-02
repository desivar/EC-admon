const express = require('express');
const router = express.Router();
const englishConnect3Controller = require('../controllers/englishConnect3Controller');

// Routes for EnglishConnect 3, nested under /api/students/:studentId
router.post('/:studentId/ec3/attendance', englishConnect3Controller.checkEC3Attendance);
router.post('/:studentId/ec3/homework', englishConnect3Controller.checkEC3Homework);

// You might add other routes here later
// router.get('/:studentId/ec3/progress', englishConnect3Controller.getEC3Progress);

// You can keep or remove this test route
router.get('/:studentId/ec3/register', (req, res) => {
    const studentId = req.params.studentId;
    res.send(`Hit the register GET route for student ID: ${studentId} (EC3)!`);
});

module.exports = router;
