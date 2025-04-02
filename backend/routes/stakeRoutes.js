// backend/routes/stakeRoutes.js
const express = require('express');
const router = express.Router();
const StakeController = require('../controllers/StakeController');

// Route to create a new stake
router.post('/', StakeController.createStake);

// Route to get all stakes (optional, for listing)
router.get('/', StakeController.getAllStakes);

// Route to assign a Stake Leader to a stake
router.put('/:stakeId/assign-leader', StakeController.assignStakeLeader);

// You can add more routes here for getting a specific stake, updating, deleting, etc.

module.exports = router;