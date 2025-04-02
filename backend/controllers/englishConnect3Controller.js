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
        await checkEC3PassStatus(student); // Check and update pass status
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
        await checkEC3PassStatus(student); // Check and update pass status
        res.json(student.englishConnect3Progress);

    } catch (error) {
        console.error('Error checking EC3 homework:', error);
        res.status(500).json({ message: 'Failed to update homework' });
    }
};

async function checkEC3PassStatus(student) {
    const totalLessons = 7;
    const requiredPercentage = 0.8;
    const requiredAttendance = Math.ceil(totalLessons * requiredPercentage);
    const requiredHomework = Math.ceil(totalLessons * requiredPercentage);

    const attendanceMet = (student.englishConnect3Progress.attendance || 0) >= requiredAttendance;
    const homeworkMet = (student.englishConnect3Progress.homeworkCompleted || 0) >= requiredHomework;

    if (attendanceMet && homeworkMet && !student.englishConnect3Progress.passed) {
        student.englishConnect3Progress.passed = true;
        await student.save();
        console.log(`Student ${student.name} passed EnglishConnect 3!`);
        // TODO: Trigger WhatsApp message here
    } else if ((!attendanceMet || !homeworkMet) && student.englishConnect3Progress.passed) {
        student.englishConnect3Progress.passed = false; // Revert if criteria no longer met (optional logic)
        await student.save();
    }
}