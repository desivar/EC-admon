// backend/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { role, firstName, lastName, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email address is already registered' });
    }

    // Create a new user
    const newUser = new User({
      role,
      firstName,
      lastName,
      email,
      password, // Password will be automatically hashed by the pre-save middleware
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'Account created successfully' }); // 201 Created status
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Failed to create account' }); // 500 Internal Server Error
  }
};