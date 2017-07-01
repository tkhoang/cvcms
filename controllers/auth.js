var 
	passport 		= require('passport'),
	BasicStrategy 	= require('passport-http').BasicStrategy,
	LocalStrategy	= require('passport-local'),
	user 			= require('../models/user'),
	client 			= require('../models/client'),
	BearerStrategy 	= require('passport-http-bearer').Strategy,
	token 			= require('../models/token');



/*
 * Basic Auth
 */
passport.use(new BasicStrategy(
	function(username, password, callback) {
		user
		.where({username:username})
		.fetch()
		.then(function (user){ 
			// No user found with that username
			if (!user) {return callback(null, false); }
			// Make sure the password is correct
			user.verifyPassword(password, function(err, isMatch) {
				if (err) { return callback(err); }
				// Password did not match
				if (!isMatch) { return callback(null, false); }
				// Success
				return callback(null, user);
			});
		}).catch(user.NotFoundError, function(err) {
			console.log(err);
		});
  	}
));

/*
 * Client Auth
 */
passport.use('client-basic', new LocalStrategy({
		usernameField : 'client_id',
		passwordField: 'client_secret'
	},
	function(username, password, callback) {
		console.log("client-basic auth");
		client
		.where({clientname:username})
		.fetch()
		.then(function (client) {
			// No client found with that id or bad password
			if(!client || client.attributes.secret != password) {return callback(null, false) ;}
			else {
				console.log("client found!")
				callback(null, client);
			}
		}).catch(client.NotFoundError, function(err) {
			console.log(err);
		});
	}
));

/*
 * Token Auth
 */
passport.use(new BearerStrategy(
	function(accessToken, callback) {
		token
		.where({access_token:accessToken})
		.fetch()
		.then(function(token){
			// No token found
	    	if (!token) { return callback(null, false); }
	    	else{
	    		user
	    		.where({id:token.attributes.user_id})
	    		.fetch()
	    		.then(function (client){
		    		// No user found
		    		if (!user) { return callback(null, false); }
		    		else{
			    		// Simple example with no scope
			    		callback(null, user, { scope: '*' });
		    		}
	    		});
	    	}
		});
	}
));



exports.isAuthenticated 		= passport.authenticate(['basic', 'bearer'], { session : false });
exports.isClientAuthenticated 	= passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated 	= passport.authenticate('bearer', { session: false });

