// backend/controllers/StakeController.js
const Stake = require('../models/Stake');
const User = require('../models/User'); // Import the User model
const mongoose = require('mongoose');

// Controller function to create a new Stake
exports.createStake = async (req, res) => {
    try {
        const { name } = req.body; // Assuming the stake name is passed in the request body

        if (!name) {
            return res.status(400).json({ message: 'Stake name is required' });
        }

        // Create a new Stake document
        const newStake = new Stake({
            name: name,
        });

        // Save the new stake to the database
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

// Controller function to get all Stakes (optional, but useful)
exports.getAllStakes = async (req, res) => {
    try {
        const stakes = await Stake.find();
        res.status(200).json(stakes);
    } catch (error) {
        console.error('Error getting all stakes:', error);
        res.status(500).json({ message: 'Failed to retrieve stakes' });
    }
};

exports.assignStakeLeader = async (req, res) => {
    const { stakeId } = req.params; // Get the stakeId from the URL parameters
    const { leaderId } = req.body;   // Get the leaderId from the request body

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

// You can add more controller functions here later (e.g., updateStake, deleteStake, etc.)