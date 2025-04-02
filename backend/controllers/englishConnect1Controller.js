
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

        const attendedLessons = student.englishConnect1Progress.attendedLessons || [];
        if (!attendedLessons.includes(lessonNumber)) {
            attendedLessons.push(lessonNumber);
            student.englishConnect1Progress.attendedLessons = attendedLessons;
            await checkEC1PassStatus(student); // Recalculate pass status
            await student.save();
        }

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

        const homeworkCompletedLessons = student.englishConnect1Progress.homeworkCompletedLessons || [];
        if (!homeworkCompletedLessons.includes(lessonNumber)) {
            homeworkCompletedLessons.push(lessonNumber);
            student.englishConnect1Progress.homeworkCompletedLessons = homeworkCompletedLessons;
            await checkEC1PassStatus(student); // Recalculate pass status
            await student.save();
        }

        res.json(student.englishConnect1Progress);

    } catch (error) {
        console.error('Error checking EC1 homework:', error);
        res.status(500).json({ message: 'Failed to update homework' });
    }
};

async function checkEC1PassStatus(student) {
    const totalLessons = 25;
    const attendanceCount = (student.englishConnect1Progress.attendedLessons || []).length;
    const homeworkCount = (student.englishConnect1Progress.homeworkCompletedLessons || []).length;

    const attendancePercentage = attendanceCount / totalLessons;
    const homeworkPercentage = homeworkCount / totalLessons;

    if (attendancePercentage >= 0.8 && homeworkPercentage >= 0.8 && !student.englishConnect1Progress.passed) {
        student.englishConnect1Progress.passed = true;
        await student.save();
        console.log(`Student ${student.name} passed EnglishConnect 1!`);
        // TODO: Trigger WhatsApp message here
    } else if ((attendancePercentage < 0.8 || homeworkPercentage < 0.8) && student.englishConnect1Progress.passed) {
        student.englishConnect1Progress.passed = false;
        await student.save();
    }
}