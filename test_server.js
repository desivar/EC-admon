const express = require('express');
const app = express();
const port = 3001; // Use a different port to avoid conflicts
const mongoose = require('mongoose'); // Assuming you need this in your controller

// Mock Student model (for testing purposes)
const Student = mongoose.model('Student', new mongoose.Schema({
    englishConnect1Progress: {
        attendedLessons: [{ type: Number }],
        homeworkCompletedLessons: [{ type: Number }],
        passed: { type: Boolean, default: false }
    },
    name: String
}));

const checkEC1Attendance = async (req, res) => {
    const { lessonNumber } = req.body;
    const { studentId } = req.params;
    console.log('Test Attendance Route Hit!', studentId, lessonNumber);
    res.json({ message: 'Test Attendance Success', studentId, lessonNumber });
};

const router = express.Router();
router.post('/:studentId/attendance', checkEC1Attendance);

app.use(express.json());
app.use('/api/students/ec1', router);

app.listen(port, () => {
    console.log(`Test server listening on port ${port}`);
});