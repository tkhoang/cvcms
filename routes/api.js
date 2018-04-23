var 
  express = require('express'),
  passport= require ('passport'),
  infos   = require('../controllers/info.js'),
  users   = require('../controllers/user.js'),
  clients = require('../controllers/client.js')
  cvs     = require('../controllers/cv.js')
  authController  = require('../controllers/auth'),
  oauth2Controller= require('../controllers/oauth2'),
  router  = express.Router();

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
  .post(authController.isAuthenticated,clients.postClients);


// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  //.post( oauth2Controller.decision);
  .post(authController.isAuthenticated, oauth2Controller.decision);
  //.post( oauth2Controller.test);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
    .post(authController.isAuthenticated, oauth2Controller.token);

router.route('/cvs')
  .get(authController.isAuthenticated,cvs.getCvs)
  .post(authController.isAuthenticated,cvs.postCv);


router.route('/cvs/:id')
  .delete(authController.isAuthenticated,cvs.deleteCv);

module.exports = router;
