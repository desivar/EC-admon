// backend/models/Ward.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WardSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    stake: {
        type: Schema.Types.ObjectId,
        ref: 'Stake', // Reference to the Stake model
        required: true,
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

const Ward = mongoose.model('Ward', WardSchema);

module.exports = Ward;