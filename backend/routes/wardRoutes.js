const express = require('express');
const router = express.Router();
const WardController = require('../controllers/WardController');

// Route to create a new ward (POST /api/wards)
router.post('', WardController.createWard);

// Route to update an existing ward by ID (PUT /api/wards/:id)
router.put('/:id', WardController.updateWard);

// Route to delete an existing ward by ID (DELETE /api/wards/:id)
router.delete('/:id', WardController.deleteWard);

module.exports = router;