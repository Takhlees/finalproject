const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Define your routes
router.get('/', reviewController.getAllReviews);
router.post('/', reviewController.addReview);
router.get('/:roomId', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
