const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const fetchUser = require('../middleware/fetchUser');

// Define your routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/currentuser',fetchUser, userController.getCurrentUser);


module.exports = router;
