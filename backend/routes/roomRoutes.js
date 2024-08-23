const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Define your routes
router.get('/', roomController.getAllRooms);
router.post('/', roomController.addRoom);
router.get('/:id', roomController.getRoomById);
router.get('/:roomId/history', roomController.getRoomHistory);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
