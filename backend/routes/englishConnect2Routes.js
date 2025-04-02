const express = require('express');
const router = express.Router();
const englishConnect2Controller = require('../controllers/englishConnect2Controller');

// Routes for EnglishConnect 2, nested under /api/students/:studentId
router.post('/:studentId/ec2/attendance', englishConnect2Controller.checkEC2Attendance);
router.post('/:studentId/ec2/homework', englishConnect2Controller.checkEC2Homework);

// You might add other routes here later
// router.get('/:studentId/ec2/progress', englishConnect2Controller.getEC2Progress);

// You can keep or remove this test route
router.get('/:studentId/ec2/register', (req, res) => {
    const studentId = req.params.studentId;
    res.send(`Hit the register GET route for student ID: ${studentId} (EC2)!`);
});

module.exports = router;