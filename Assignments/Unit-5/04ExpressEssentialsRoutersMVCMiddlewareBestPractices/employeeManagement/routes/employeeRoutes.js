const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const roleCheck = require('../middlewares/roleCheckMiddleware');

router.get('/', roleCheck(['admin', 'hr']), employeeController.getEmployees);
router.post('/', roleCheck(['admin']), employeeController.addEmployee);
router.put('/:id', roleCheck(['admin', 'hr']), employeeController.updateEmployee);
router.delete('/:id', roleCheck(['admin']), employeeController.deleteEmployee);

module.exports = router;
