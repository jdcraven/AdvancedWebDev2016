var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/index');

router.get('/', ctrlHome.index);
router.post('/', ctrlHome.index);
router.get('/view', ctrlHome.view);

module.exports = router;
