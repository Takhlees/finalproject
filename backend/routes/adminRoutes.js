const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateRole = require('../middleware/authenticateRole');

router.get('/dashboard', authenticateRole('admin'), adminController.getDashboardMetrics);

module.exports = router;
