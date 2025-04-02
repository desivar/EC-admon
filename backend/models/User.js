const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    role: {
        type: String,
        enum: ['stakeleader', 'wardleader', 'teacher', 'student'],
        required: true,
    },
    name: { // <--- Check this field
        type: String,
        required: true, // <--- This must be true
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Don't return password by default
        minlength: 6,
    },
    // ... other fields
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);