var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/employee');

/* Locations pages */
router.get('/', ctrlLocations.employeePage);
router.post('/add', ctrlLocations.employeeAdd);
router.get('/add', ctrlLocations.employeeAddView);

module.exports = router;
