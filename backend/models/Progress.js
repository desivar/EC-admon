// backend/models/Progress.js
const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    lessonNumber: {
        type: Number,
        required: true
    },
    attended: {
        type: Boolean,
        default: false
    },
    homeworkCompleted: {
        type: Boolean,
        default: false
    },
    track: {
        type: String,
        enum: ['EnglishConnect1', 'EnglishConnect2', 'EnglishConnect3' /*, Add other tracks if needed */ ],
        required: true
    },
    // Optional: You might want to record the date of attendance/completion
    attendanceDate: {
        type: Date
    },
    homeworkCompletionDate: {
        type: Date
    }
}, { timestamps: true });

// Optional: Add a unique constraint to prevent duplicate entries
// for the same student and lesson within a track
ProgressSchema.index({ studentId: 1, lessonNumber: 1, track: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);