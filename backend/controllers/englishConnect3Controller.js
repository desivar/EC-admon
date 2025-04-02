const Student = require('../models/Student');

exports.checkEC3Attendance = async (req, res) => {
    const { lessonNumber } = req.body;
    const { studentId } = req.params;

    if (lessonNumber < 51 || lessonNumber > 57) {
        return res.status(400).json({ message: 'Invalid lesson number for EnglishConnect 3 (51-57)' });
    }

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.englishConnect3Progress.attendance = (student.englishConnect3Progress.attendance || 0) + 1;
        await student.save();
        res.json(student.englishConnect3Progress);

    } catch (error) {
        console.error('Error checking EC3 attendance:', error);
        res.status(500).json({ message: 'Failed to update attendance' });
    }
};

exports.checkEC3Homework = async (req, res) => {
    const { lessonNumber } = req.body;
    const { studentId } = req.params;

    if (lessonNumber < 51 || lessonNumber > 57) {
        return res.status(400).json({ message: 'Invalid lesson number for EnglishConnect 3 (51-57)' });
    }

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.englishConnect3Progress.homeworkCompleted = (student.englishConnect3Progress.homeworkCompleted || 0) + 1;
        await student.save();
        res.json(student.englishConnect3Progress);

    } catch (error) {
        console.error('Error checking EC3 homework:', error);
        res.status(500).json({ message: 'Failed to update homework' });
    }
};