// backend/models/Stake.js
const mongoose = require('mongoose');

const StakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Optional: If you want stake names to be unique
  },
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