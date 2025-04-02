// backend/controllers/UserController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    console.log('Received registration request:', req.body);

    try {
        const { role, firstName, lastName, email, password } = req.body; // Destructure without assignedStake

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email address is already registered' });
        }

        const newUser = new User({
            role,
            firstName,
            lastName,
            email,
            password,
            // We are intentionally not setting assignedStake here for now
        });

        console.log('New user object created:', newUser);

        try {
            const savedUser = await newUser.save();
            console.log('User saved successfully:', savedUser);
            res.status(201).json({ message: 'Account created successfully' });
        } catch (saveError) {
            console.error('Error during newUser.save():', saveError);
            console.error('Save error stack:', saveError.stack);
            res.status(500).json({ message: 'Failed to create account (save error)' });
        }

    } catch (error) {
        console.error('Error during user registration:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ message: 'Failed to create account (general error)' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email }).select('+password'); // Explicitly select password

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', {
            expiresIn: '1h',
        });

        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

module.exports = exports;