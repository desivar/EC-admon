const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    role: {
        type: String,
        enum: ['stakeleader', 'wardleader', 'teacher', 'student'],
        required: true,
    },
    name: {
        type: String,
        required: true,
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
    stake: {
        type: Schema.Types.ObjectId,
        ref: 'Stake',
        required: true, // All users (leaders and teachers) will belong to a stake
    },
    ward: {
        type: Schema.Types.ObjectId,
        ref: 'Ward',
        required: function() {
            return this.role === 'teacher' || this.role === 'wardleader';
        },
    },
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