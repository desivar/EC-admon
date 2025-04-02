// backend/controllers/StakeController.js
const Stake = require('../models/Stake');
const User = require('../models/User'); // Import the User model
const mongoose = require('mongoose');

exports.createStake = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Stake name is required' });
        }
        const newStake = new Stake({ name });
        const savedStake = await newStake.save();
        res.status(201).json({ message: 'Stake created successfully', stake: savedStake });
    } catch (error) {
        console.error('Error creating stake:', error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
            return res.status(400).json({ message: 'Stake name already exists' });
        }
        res.status(500).json({ message: 'Failed to create stake' });
    }
};

exports.assignStakeLeader = async (req, res) => {
    const { stakeId } = req.params;
    const { leaderId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(stakeId) || !mongoose.Types.ObjectId.isValid(leaderId)) {
        return res.status(400).json({ message: 'Invalid Stake ID or Leader ID' });
    }

    try {
        const stake = await Stake.findById(stakeId);
        if (!stake) {
            return res.status(404).json({ message: 'Stake not found' });
        }

        const leader = await User.findById(leaderId);
        if (!leader) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (leader.role !== 'stakeleader') {
            return res.status(400).json({ message: 'User is not a Stake Leader' });
        }

        stake.stakeLeader = leaderId;
        const updatedStake = await stake.save();

        res.status(200).json({ message: 'Stake Leader assigned successfully', stake: updatedStake });

    } catch (error) {
        console.error('Error assigning Stake Leader:', error);
        res.status(500).json({ message: 'Failed to assign Stake Leader' });
    }
};

exports.addTeacherToStake = async (req, res) => {
    const { stakeId } = req.params;
    const { teacherId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(stakeId) || !mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({ message: 'Invalid Stake ID or Teacher ID' });
    }

    try {
        const stake = await Stake.findById(stakeId);
        if (!stake) {
            return res.status(404).json({ message: 'Stake not found' });
        }

        const teacher = await User.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        if (teacher.role !== 'teacher') {
            return res.status(400).json({ message: 'User is not a teacher' });
        }

        // Check if the teacher is already in the stake
        if (stake.teachers.includes(teacherId)) {
            return res.status(400).json({ message: 'Teacher is already assigned to this stake' });
        }

        stake.teachers.push(teacherId);
        const updatedStake = await stake.save();

        res.status(200).json({ message: 'Teacher added to stake successfully', stake: updatedStake });

    } catch (error) {
        console.error('Error adding teacher to stake:', error);
        res.status(500).json({ message: 'Failed to add teacher to stake' });
    }
};
// ADD THE NEW FUNCTION HERE:
exports.removeTeacherFromStake = async (req, res) => {
    const { stakeId } = req.params;
    const { teacherId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(stakeId) || !mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({ message: 'Invalid Stake ID or Teacher ID' });
    }

    try {
        const stake = await Stake.findById(stakeId);
        if (!stake) {
            return res.status(404).json({ message: 'Stake not found' });
        }

        // Check if the teacher is in the stake
        const teacherIndex = stake.teachers.indexOf(teacherId);
        if (teacherIndex === -1) {
            return res.status(400).json({ message: 'Teacher not found in this stake' });
        }

        stake.teachers.splice(teacherIndex, 1); // Remove the teacher ID from the array
        const updatedStake = await stake.save();

        res.status(200).json({ message: 'Teacher removed from stake successfully', stake: updatedStake });

    } catch (error) {
        console.error('Error removing teacher from stake:', error);
        res.status(500).json({ message: 'Failed to remove teacher from stake' });
    }
};

exports.getAllStakes = async (req, res) => {
    try {
        const stakes = await Stake.find();
        res.status(200).json(stakes);
    } catch (error) {
        console.error('Error getting all stakes:', error);
        res.status(500).json({ message: 'Failed to retrieve stakes' });
    }
};

module.exports = exports;