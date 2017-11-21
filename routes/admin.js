var express = require('express');
var router = express.Router();
var adminControler	= require('../controllers/admin');
var authController 	= require('../controllers/auth');
var oauth2Controller= require('../controllers/oauth2');


var config = require ('./../webpack.config.js');
var cssModulesRequireHook = require ( 'css-modules-require-hook');

var webpack = require ( 'webpack');
var webpackDevMiddleware = require ( 'webpack-dev-middleware');
var webpackHotMiddleware = require ( 'webpack-hot-middleware');

cssModulesRequireHook({generateScopedName: '[path][name]-[local]'});
const compiler = webpack(config);


// Serve hot-reloading bundle to client
router.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: config.output.publicPath, stats: { colors: true } 
}));
router.use(webpackHotMiddleware(compiler));


// Do "hot-reloading" of react stuff on the server
// Throw away the cached client modules and let them be re-required next time
compiler.plugin('done', function() {
  console.log("Clearing /client/ module cache from server");
  Object.keys(require.cache).forEach(function(id) {
    if (/[\/\\]adminclient[\/\\]/.test(id)) delete require.cache[id];
  });
});

router.get('/', function(req, res, next) {	
	var params = { };
	res.render('admin', params);
});


router.get('/*', function(req, res, next) {	
  res.redirect('/admin');
});


module.exports = router;
