const express = require('express');
const router = express.Router();
const WardController = require('../controllers/WardController');

// Route to create a new ward
router.post('/wards', WardController.createWard);

// You can add more routes here later for getting all wards, getting a specific ward, updating, deleting, etc.

module.exports = router;