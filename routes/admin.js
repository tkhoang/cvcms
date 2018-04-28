var express = require('express');
var router = express.Router();
var adminControler	= require('../controllers/admin');
var authController 	= require('../controllers/auth');
var oauth2Controller= require('../controllers/oauth2');

router.get('/', function(req, res, next) {	
	var params = { };
	res.render('admin', params);
});


router.get('/*', function(req, res, next) {	
	var params = { };
	res.render('admin', params);
});


module.exports = router;
