// backend/controllers/StakeController.js
const Stake = require('../models/Stake'); // Assuming you will create a Stake model

// Controller function to create a new Stake
exports.createStake = async (req, res) => {
  try {
    const { name } = req.body; // Assuming the stake name is passed in the request body

    // Create a new Stake document
    const newStake = new Stake({
      name: name,
    });

    // Save the new stake to the database
    const savedStake = await newStake.save();

    res.status(201).json({ message: 'Stake created successfully', stake: savedStake });
  } catch (error) {
    console.error('Error creating stake:', error);
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

// You can add more controller functions here for updating, deleting, etc.