const express = require('express');
const router = express.Router();
const WardController = require('../controllers/WardController');

router.post('', WardController.createWard); // Use the controller function here

module.exports = router;