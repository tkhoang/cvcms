var 
	express 		= require('express'),
	passport 		= require ('passport'),
	infos 			= require('../controllers/info.js'),
	users 			= require('../controllers/user.js'),
	clients			= require('../controllers/client.js')
	authController 	= require('../controllers/auth'),
	oauth2Controller= require('../controllers/oauth2'),
	router 			= express.Router();

router.use (function(req, res, next){
	next();
});

router.route('/infos')
	.get(authController.isAuthenticated,infos.getInfos)
	.post(infos.postInfos);

router.route('/infos/:lang')
	.get(infos.getInfoByLangAPI);

router.route('/infos/:lang/:key')
	.get(infos.getInfoByLangAndKey)
	.put(infos.putInfoByLangAndKey)
	.delete(infos.delInfoByLangAndKey);	
	
router.route('/users')
	.post(users.postUsers);

router.route('/users/:username')
	.get(authController.isAuthenticated,users.getUsers);
	//.get(users.getUsers);

router.route('/users/:username/:password')
	.get(users.testUserPassword);

router.route('/clients')
	.get(authController.isAuthenticated,clients.getClients)
	.post(authController.isAuthenticated,clients.postClients);


// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
	.get(authController.isAuthenticated, oauth2Controller.authorization)
	.post(authController.isClientAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  	.post(authController.isClientAuthenticated, oauth2Controller.token);


module.exports = router;
