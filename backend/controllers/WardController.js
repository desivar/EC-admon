const Ward = require('../models/Ward');
const Stake = require('../models/Stake');

exports.createWard = async (req, res) => {
    try {
        const { name, stakeId } = req.body;

        if (!name || !stakeId) {
            return res.status(400).json({ message: 'Ward name and Stake ID are required.' });
        }

        const stakeExists = await Stake.findById(stakeId);
        if (!stakeExists) {
            return res.status(404).json({ message: 'Stake not found.' });
        }

        const newWard = new Ward({
            name,
            stake: stakeId,
        });

        const savedWard = await newWard.save();

        res.status(201).json({ message: 'Ward created successfully', ward: savedWard });

    } catch (error) {
        console.error('Error creating ward:', error);
        res.status(500).json({ message: 'Failed to create ward' });
    }
};

exports.updateWard = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, stakeId } = req.body;

        if (!name && !stakeId) {
            return res.status(400).json({ message: 'At least one field (name or stakeId) is required to update.' });
        }

        if (stakeId) {
            const stakeExists = await Stake.findById(stakeId);
            if (!stakeExists) {
                return res.status(404).json({ message: 'Stake not found.' });
            }
        }

        const updatedWard = await Ward.findByIdAndUpdate(
            id,
            { name, stake: stakeId },
            { new: true, runValidators: true }
        );

        if (!updatedWard) {
            return res.status(404).json({ message: 'Ward not found.' });
        }

        res.status(200).json({ message: 'Ward updated successfully', ward: updatedWard });

    } catch (error) {
        console.error('Error updating ward:', error);
        res.status(500).json({ message: 'Failed to update ward' });
    }
};

exports.deleteWard = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedWard = await Ward.findByIdAndDelete(id);

        if (!deletedWard) {
            return res.status(404).json({ message: 'Ward not found.' });
        }

        res.status(200).json({ message: 'Ward deleted successfully' });

    } catch (error) {
        console.error('Error deleting ward:', error);
        res.status(500).json({ message: 'Failed to delete ward' });
    }
};

module.exports = exports;