var express = require('express');
var router = express.Router();


var planetsController = require('../controller/planets');
router.get('/', planetsController.get);



module.exports = router