const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Define your routes
router.get('/', employeeController.getAllEmployees);
router.post('/', employeeController.addEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
