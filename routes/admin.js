var 
	express 		= require('express'),
	i18n 			= require("i18n"),
	adminControler	= require('../controllers/admin'),
	authController 	= require('../controllers/auth'),
	path 			= require('path'),
	oauth2Controller= require('../controllers/oauth2');

var isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = process.env.NODE_ENV !== 'production';	
	
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');


if (isDeveloping) {
	const compiler = webpack(config);
	const middleware = webpackMiddleware(compiler, {
		publicPath: config.output.publicPath,
		contentBase: 'src',
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	});
	router.use(middleware);
	router.use(webpackHotMiddleware(compiler));
	router.get('/', function response(req, res) {
		res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
		res.end();
	  });
} else {
	router.use(express.static(__dirname + '/dist'));
	router.get('/', function response(req, res) {
		res.sendFile(path.join(__dirname, 'dist/index.html'));
	});
}
/*
router.get('/', function(req, res, next) {
	
	i18n.setLocale('en');
	 var params = { };
	 res.render('admin', params);
	
});*/

module.exports = router;
