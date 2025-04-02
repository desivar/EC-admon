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

        const attendedLessons = student.englishConnect3Progress.attendedLessons || [];
        if (!attendedLessons.includes(lessonNumber)) {
            attendedLessons.push(lessonNumber);
            student.englishConnect3Progress.attendedLessons = attendedLessons;
            await checkEC3PassStatus(student); // Recalculate pass status
            await student.save();
        }

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

        const homeworkCompletedLessons = student.englishConnect3Progress.homeworkCompletedLessons || [];
        if (!homeworkCompletedLessons.includes(lessonNumber)) {
            homeworkCompletedLessons.push(lessonNumber);
            student.englishConnect3Progress.homeworkCompletedLessons = homeworkCompletedLessons;
            await checkEC3PassStatus(student); // Recalculate pass status
            await student.save();
        }

        res.json(student.englishConnect3Progress);

    } catch (error) {
        console.error('Error checking EC3 homework:', error);
        res.status(500).json({ message: 'Failed to update homework' });
    }
};

async function checkEC3PassStatus(student) {
    const totalLessons = 7;
    const attendanceCount = (student.englishConnect3Progress.attendedLessons || []).length;
    const homeworkCount = (student.englishConnect3Progress.homeworkCompletedLessons || []).length;

    const attendancePercentage = attendanceCount / totalLessons;
    const homeworkPercentage = homeworkCount / totalLessons;

    if (attendancePercentage >= 0.8 && homeworkPercentage >= 0.8 && !student.englishConnect3Progress.passed) {
        student.englishConnect3Progress.passed = true;
        await student.save();
        console.log(`Student ${student.name} passed EnglishConnect 3!`);
        // TODO: Trigger WhatsApp message here
    } else if ((attendancePercentage < 0.8 || homeworkPercentage < 0.8) && student.englishConnect3Progress.passed) {
        student.englishConnect3Progress.passed = false;
        await student.save();
    }
}
