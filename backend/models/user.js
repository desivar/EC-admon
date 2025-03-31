// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['stakeleader', 'teacher', 'student'],
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
    unique: true, // Ensures each email is unique in the database
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add other relevant fields like wardId for teachers/students, etc.
  wardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ward', // Assuming you might have a Ward model
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

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