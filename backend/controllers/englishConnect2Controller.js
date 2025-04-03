const Student = require('../models/Student');
const { sendWhatsAppMessage } = require('../utils/whatsapp');
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

        const attendedLessons = student.englishConnect2Progress.attendedLessons || [];
        if (!attendedLessons.includes(lessonNumber)) {
            attendedLessons.push(lessonNumber);
            student.englishConnect2Progress.attendedLessons = attendedLessons;
            await checkEC2PassStatus(student);
            await student.save();
        }

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

        const homeworkCompletedLessons = student.englishConnect2Progress.homeworkCompletedLessons || [];
        if (!homeworkCompletedLessons.includes(lessonNumber)) {
            homeworkCompletedLessons.push(lessonNumber);
            student.englishConnect2Progress.homeworkCompletedLessons = homeworkCompletedLessons;
            await checkEC2PassStatus(student);
            await student.save();
        }

        res.json(student.englishConnect2Progress);

    } catch (error) {
        console.error('Error checking EC2 homework:', error);
        res.status(500).json({ message: 'Failed to update homework' });
    }
};

async function checkEC2PassStatus(student) {
    const totalLessons = 25;
    const attendanceCount = (student.englishConnect2Progress.attendedLessons || []).length;
    const homeworkCount = (student.englishConnect2Progress.homeworkCompletedLessons || []).length;

    const attendancePercentage = attendanceCount / totalLessons;
    const homeworkPercentage = homeworkCount / totalLessons;

    if (attendancePercentage >= 0.8 && homeworkPercentage >= 0.8 && !student.englishConnect2Progress.passed) {
        student.englishConnect2Progress.passed = true;
        await student.save();
        console.log(`Student ${student.name} passed EnglishConnect 2!`);

        // Add this block to send the WhatsApp message
        if (student.contactNumber) {
            const messageBody = `Congratulations, ${student.name}! You have passed EnglishConnect 2!`;
            await sendWhatsAppMessage(student.contactNumber, messageBody);
        } else {
            console.warn(`Student ${student.name} has no contact number, cannot send WhatsApp message.`);
        }
    } else if ((attendancePercentage < 0.8 || homeworkPercentage < 0.8) && student.englishConnect2Progress.passed) {
        student.englishConnect2Progress.passed = false;
        await student.save();
    }
}