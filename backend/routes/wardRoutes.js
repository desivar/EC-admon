const express = require('express');
const router = express.Router();
// const WardController = require('../controllers/WardController'); // Comment this out for now

router.post('/wards', (req, res) => {
    res.send('Wards route is working!');
});

module.exports = router;