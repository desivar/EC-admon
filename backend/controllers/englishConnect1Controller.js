
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
        await checkEC1PassStatus(student); // Check and update pass status
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
        await checkEC1PassStatus(student); // Check and update pass status
        res.json(student.englishConnect1Progress);

    } catch (error) {
        console.error('Error checking EC1 homework:', error);
        res.status(500).json({ message: 'Failed to update homework' });
    }
};

async function checkEC1PassStatus(student) {
    const totalLessons = 25;
    const requiredPercentage = 0.8;
    const requiredAttendance = Math.ceil(totalLessons * requiredPercentage);
    const requiredHomework = Math.ceil(totalLessons * requiredPercentage);

    const attendanceMet = (student.englishConnect1Progress.attendance || 0) >= requiredAttendance;
    const homeworkMet = (student.englishConnect1Progress.homeworkCompleted || 0) >= requiredHomework;

    if (attendanceMet && homeworkMet && !student.englishConnect1Progress.passed) {
        student.englishConnect1Progress.passed = true;
        await student.save();
        console.log(`Student ${student.name} passed EnglishConnect 1!`);
        // TODO: Trigger WhatsApp message here
    } else if ((!attendanceMet || !homeworkMet) && student.englishConnect1Progress.passed) {
        student.englishConnect1Progress.passed = false; // Revert if criteria no longer met (optional logic)
        await student.save();
    }
}