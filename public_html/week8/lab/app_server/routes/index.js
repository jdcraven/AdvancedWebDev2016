var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/employee');

/* Locations pages */
router.all('/', ctrlHome.angularApp);

module.exports = router;
