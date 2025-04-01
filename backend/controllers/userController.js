// backend/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  console.log('Received registration request:', req.body); // Log the request body

  try {
    const { role, firstName, lastName, email, password, assignedStake } = req.body; // Include assignedStake here

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
      password,
      assignedStake: assignedStake // Use the assignedStake from req.body
    });

    console.log('New user object created:', newUser); // Log the new user object before saving

    const savedUser = await newUser.save();
    console.log('User saved successfully:', savedUser);
    res.status(201).json({ message: 'Account created successfully' }); // 201 Created status
  } catch (error) {
    console.error('Error during user registration:', error);
    console.error('Error stack:', error.stack); // Log the error stack
    res.status(500).json({ message: 'Failed to create account' }); // 500 Internal Server Error
  }
};