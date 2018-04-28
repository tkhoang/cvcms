var express = require('express');
var router = express.Router();
var initControler	= require('../controllers/init');
var authController 	= require('../controllers/auth');
var oauth2Controller= require('../controllers/oauth2');
var models = require('../models'); 

router.get('/', function(req, res, next) {	
	var params = { };
  var cb;
  models.isInitialized((isInit)=>{
    if (isInit)
    {
      res.redirect('/admin'); 
    }
    else
    {
      res.render('init', params);
    }
  });
});


router.get('/*', function(req, res, next) {	
  res.redirect('/init');
});


module.exports = router;
