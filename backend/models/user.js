const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['stakeleader', 'wardleader', 'teacher', 'student'],
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    wardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ward', // Reference to the Ward model
    },
    assignedStake: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stake', // Optional: If you want to explicitly assign Stake Leaders to a stake
        required: function() {
            return this.role === 'stakeleader';
        }
    },
    assignedWard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ward', // Teachers and Ward Leaders are assigned to a ward
        required: function() {
            return this.role === 'wardleader' || this.role === 'teacher';
        }
    },
    currentTrack: {
        type: String,
        enum: ['EnglishConnect1', 'EnglishConnect2', 'EnglishConnect3', null], // Student's current track, null if not assigned
        default: null,
        required: function() {
            return this.role === 'student';
        }
    },
    whatsappNumber: {
        type: String,
        trim: true,
        // You might want to add validation for phone number format
        required: function() {
            return this.role === 'student';
        }
    }
}, { timestamps: true });

// Hash the password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare provided password with stored hashed password
UserSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model('User', UserSchema);