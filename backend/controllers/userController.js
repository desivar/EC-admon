// backend/controllers/UserController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Stake = require('../models/Stake');
const Ward = require('../models/Ward');

exports.registerUser = async (req, res) => {
    console.log('Received registration request:', req.body);

    try {
        const { role, name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email address is already registered' });
        }

        const newUser = new User({
            role,
            name,
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

exports.createTeacher = async (req, res) => {
    try {
        const { name, email, password, stake, ward } = req.body; // Adjust based on your user creation fields

        if (!name || !email || !password || !stake || !ward) {
            return res.status(400).json({ message: 'Name, email, password, stake, and ward are required for a teacher.' });
        }

        const stakeExists = await Stake.findById(stake);
        if (!stakeExists) {
            return res.status(404).json({ message: 'Stake not found.' });
        }

        const wardExists = await Ward.findById(ward);
        if (!wardExists) {
            return res.status(404).json({ message: 'Ward not found.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email address is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = new User({
            role: 'teacher',
            name,
            email,
            password: hashedPassword,
            stake,
            ward,
        });

        const savedUser = await newTeacher.save();

        res.status(201).json({ message: 'Teacher created successfully', user: savedUser });

    } catch (error) {
        console.error('Error creating teacher:', error);
        res.status(500).json({ message: 'Failed to create teacher' });
    }
};

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher' }).populate('stake').populate('ward');
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error getting all teachers:', error);
        res.status(500).json({ message: 'Failed to get teachers' });
    }
};

exports.getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await User.findById(id).populate('stake').populate('ward');
        if (!teacher || teacher.role !== 'teacher') {
            return res.status(404).json({ message: 'Teacher not found.' });
        }
        res.status(200).json(teacher);
    } catch (error) {
        console.error('Error getting teacher by ID:', error);
        res.status(500).json({ message: 'Failed to get teacher' });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, stake, ward, password, ...otherUpdates } = req.body;

        const teacher = await User.findById(id);
        if (!teacher || teacher.role !== 'teacher') {
            return res.status(404).json({ message: 'Teacher not found.' });
        }

        if (stake) {
            const stakeExists = await Stake.findById(stake);
            if (!stakeExists) {
                return res.status(404).json({ message: 'Stake not found.' });
            }
            teacher.stake = stake;
        }

        if (ward) {
            const wardExists = await Ward.findById(ward);
            if (!wardExists) {
                return res.status(404).json({ message: 'Ward not found.' });
            }
            teacher.ward = ward;
        }

        if (name) teacher.name = name;
        if (email) teacher.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            teacher.password = hashedPassword;
        }

        for (const key in otherUpdates) {
            if (teacher.schema.paths.hasOwnProperty(key) && key !== 'role' && key !== 'stake' && key !== 'ward' && key !== 'email' && key !== 'password') {
                teacher[key] = otherUpdates[key];
            }
        }

        const updatedTeacher = await teacher.save();
        res.status(200).json({ message: 'Teacher updated successfully', user: updatedTeacher });

    } catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).json({ message: 'Failed to update teacher' });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await User.findByIdAndDelete(id);
        if (!teacher || teacher.role !== 'teacher') {
            return res.status(404).json({ message: 'Teacher not found.' });
        }
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ message: 'Failed to delete teacher' });
    }
};