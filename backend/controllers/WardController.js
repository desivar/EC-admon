const Ward = require('../models/Ward');
const Stake = require('../models/Stake'); // Assuming you might want to verify the stake

exports.createWard = async (req, res) => {
    try {
        const { name, stakeId } = req.body; // Expecting ward name and the Stake ID in the request body

        // Basic input validation
        if (!name || !stakeId) {
            return res.status(400).json({ message: 'Ward name and Stake ID are required.' });
        }

        // Verify if the Stake exists (optional, but recommended for data integrity)
        const stakeExists = await Stake.findById(stakeId);
        if (!stakeExists) {
            return res.status(404).json({ message: 'Stake not found.' });
        }

        // Create a new Ward document
        const newWard = new Ward({
            name,
            stake: stakeId,
        });

        // Save the new ward to the database
        const savedWard = await newWard.save();

        res.status(201).json({ message: 'Ward created successfully', ward: savedWard });

    } catch (error) {
        console.error('Error creating ward:', error);
        res.status(500).json({ message: 'Failed to create ward' });
    }
};

// You'll add more controller functions here later (e.g., getAllWards)

module.exports = exports;