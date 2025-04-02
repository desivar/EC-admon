const Progress = require('../models/Progress');

exports.checkAttendance = async (req, res) => {
    const { studentId, lessonNumber } = req.body;

    if (lessonNumber < 26 || lessonNumber > 50) {
        return res.status(400).json({ message: 'Invalid lesson number for EnglishConnect 2' });
    }

    try {
        const progress = await Progress.findOneAndUpdate(
            { studentId, lessonNumber },
            { attended: true },
            { new: true, upsert: true }
        );
        res.json(progress);
    } catch (error) {
        console.error('Error checking attendance:', error);
        res.status(500).json({ message: 'Failed to update attendance' });
    }
};

exports.checkHomework = async (req, res) => {
    const { studentId, lessonNumber } = req.body;

    if (lessonNumber < 26 || lessonNumber > 50) {
        return res.status(400).json({ message: 'Invalid lesson number for EnglishConnect 2' });
    }

    try {
        const progress = await Progress.findOneAndUpdate(
            { studentId, lessonNumber },
            { homeworkCompleted: true },
            { new: true, upsert: true }
        );
        res.json(progress);
    } catch (error) {
        console.error('Error checking homework:', error);
        res.status(500).json({ message: 'Failed to update homework' });
    }
};
