const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const fetchUser = require('../middleware/fetchUser');

// Define your routes
router.get('/', bookingController.getAllBookings);
router.post('/add',fetchUser, bookingController.addBooking);
router.post('/approve/:id', bookingController.approveBooking);
router.post('/reject/:id', bookingController.rejectBooking);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
