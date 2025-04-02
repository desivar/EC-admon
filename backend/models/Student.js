const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber: {
        type: String,
        trim: true // Consider adding validation for phone number format
    },
    ward: {
        type: Schema.Types.ObjectId,
        ref: 'Ward',
        required: true
    },
    // Progress Tracking for EnglishConnect Courses (Updated for checklist)
    englishConnect1Progress: {
        attendedLessons: [{ type: Number, min: 1, max: 25 }],
        homeworkCompletedLessons: [{ type: Number, min: 1, max: 25 }],
        passed: { type: Boolean, default: false }
    },
    englishConnect2Progress: {
        attendedLessons: [{ type: Number, min: 26, max: 50 }],
        homeworkCompletedLessons: [{ type: Number, min: 26, max: 50 }],
        passed: { type: Boolean, default: false }
    },
    englishConnect3Progress: {
        attendedLessons: [{ type: Number, min: 51, max: 57 }],
        homeworkCompletedLessons: [{ type: Number, min: 51, max: 57 }],
        passed: { type: Boolean, default: false }
    },
    // Optional: Reference to the teacher(s) currently instructing the student
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: 'User' // Assuming teachers are Users
    }],
    // Optional: Any additional notes or information about the student
    notes: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);