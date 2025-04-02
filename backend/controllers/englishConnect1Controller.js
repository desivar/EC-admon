const Student = require('../models/Student');

exports.checkEC1Attendance = async (req, res) => {
    const { lessonNumber } = req.body;
    const { studentId } = req.params;

    if (lessonNumber < 1 || lessonNumber > 25) {
        return res.status(400).json({ message: 'Invalid lesson number for EnglishConnect 1 (1-25)' });
    }

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.englishConnect1Progress.attendance = (student.englishConnect1Progress.attendance || 0) + 1;
        await student.save();
        res.json(student.englishConnect1Progress);

    } catch (error) {
        console.error('Error checking EC1 attendance:', error);
        res.status(500).json({ message: 'Failed to update attendance' });
    }
};

exports.checkEC1Homework = async (req, res) => {
    const { lessonNumber } = req.body;
    const { studentId } = req.params;

    if (lessonNumber < 1 || lessonNumber > 25) {
        return res.status(400).json({ message: 'Invalid lesson number for EnglishConnect 1 (1-25)' });
    }

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.englishConnect1Progress.homeworkCompleted = (student.englishConnect1Progress.homeworkCompleted || 0) + 1;
        await student.save();
        res.json(student.englishConnect1Progress);

    } catch (error) {
        console.error('Error checking EC1 homework:', error);
        res.status(500).json({ message: 'Failed to update homework' });
    }
};