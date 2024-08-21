const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Define your payment routes
router.post('/create-payment-intent', paymentController.createPaymentIntent);

module.exports = router;
