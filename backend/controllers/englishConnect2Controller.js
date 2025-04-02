const Student = require('../models/Student');

exports.checkEC2Attendance = async (req, res) => {
    const { lessonNumber } = req.body;
    const { studentId } = req.params;

    if (lessonNumber < 26 || lessonNumber > 50) {
        return res.status(400).json({ message: 'Invalid lesson number for EnglishConnect 2 (26-50)' });
    }

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.englishConnect2Progress.attendance = (student.englishConnect2Progress.attendance || 0) + 1;
        await student.save();
        res.json(student.englishConnect2Progress);

    } catch (error) {
        console.error('Error checking EC2 attendance:', error);
        res.status(500).json({ message: 'Failed to update attendance' });
    }
};

exports.checkEC2Homework = async (req, res) => {
    const { lessonNumber } = req.body;
    const { studentId } = req.params;

    if (lessonNumber < 26 || lessonNumber > 50) {
        return res.status(400).json({ message: 'Invalid lesson number for EnglishConnect 2 (26-50)' });
    }

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.englishConnect2Progress.homeworkCompleted = (student.englishConnect2Progress.homeworkCompleted || 0) + 1;
        await student.save();
        res.json(student.englishConnect2Progress);

    } catch (error) {
        console.error('Error checking EC2 homework:', error);
        res.status(500).json({ message: 'Failed to update homework' });
    }
};