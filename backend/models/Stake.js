// backend/models/Stake.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // It's good practice to explicitly define Schema

const StakeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Assuming Stake names should be unique
    },
    stakeLeader: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        default: null, // Initially, a stake might not have a leader
    },
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (for teachers)
    }],
    wards: [{
        type: Schema.Types.ObjectId,
        ref: 'Ward', // Reference to the Ward model (if you create one later)
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Stake = mongoose.model('Stake', StakeSchema);

module.exports = Stake;