var express = require('express');
var router = express.Router();


var peopleController = require('../controller/people');
router.get('/', peopleController.get);



module.exports = router