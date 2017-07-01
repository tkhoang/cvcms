// Load required packages
var 
	oauth2orize = require('oauth2orize'),
	user 		= require('../models/user'),
	client 		= require('../models/client'),
	token 		= require('../models/token'),
	code 		= require('../models/code');

//Create OAuth 2.0 server
var server = oauth2orize.createServer();

//Register serialialization function
server.serializeClient(function(client, callback) {
	return callback(null, client.id);
});

// Register deserialization function
server.deserializeClient(function(id, callback) {
	client
	.where({id:id})
	.fetch()
	.then(function (client) {
		return callback(null, client);
  }).catch(client.NotFoundError, function(err) {
		console.log(err);
	});
});

//Register authorization code grant type
server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback) {
	// Create a new authorization code
	  new code({
	    value: uid(16),
	    client_id: client.id,
	    redirect_uri: redirectUri,
	    user_id: user.id
	  })
	  .save(null,{method: "insert"})
	  .then(function(code){
		  callback(null, code.attributes.value);
	  }).catch(function(err) {
		  	console.log(err);
			return callback(err);
		});
	}));

//Exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code(function(client, code_value, redirectUri, callback) {
	
	console.log('auth code');
	console.log( ' code='+code_value );
	console.log( ' client='+ client.id);
	
	code
	.where({value: code_value})
	.fetch()
	.then(function(authCode){
	
		if (!authCode) 
		{ console.log("code not found"); return callback(null, false); }
		if (client.id.toString() != authCode.attributes.client_id) 
		{ console.log("clientid different"); return callback(null, false); }
		if (redirectUri != authCode.attributes.redirect_uri) 
		{ console.log("url different"); return callback(null, false); }

		//create a new token
		new token ({
			access_token: uid(256),
			client_id: authCode.attributes.client_id,
			user_id: authCode.attributes.user_id,
			expires: new Date(new Date().getTime() + (30 * 60 * 60 * 1000))
		})
		.save(null, {method:"insert"})
		.then(function (token){
		
			// Delete auth code now that it has been used
			authCode
			.destroy()
			.then(function(authCode){
				callback(null, token);
			}).catch(function(err) { return callback(err);});
		}).catch(function(err) {return callback(err);});
  })
  .catch(function(err) {return callback(null,false);});
}));

/*
 * Exchange user id and password for access tokens
 */
server.exchange(oauth2orize.exchange.password(function(client, username,password,scope,callback){
	
	console.log('auth password');
	console.log( ' username='+username );
	console.log( ' password='+password );
	console.log( ' client='+ client.id);
	
	client
	.where({id:client.id})
	.fetch()
	.then(function(client){
		if(!client)
		{ return callback(null, false); }
		
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
				
				//create a new token
				new token ({
					access_token: uid(256),
					client_id: client.attributes.id,
					user_id: user.attributes.id,
					expires: new Date(new Date().getTime() + (30 * 60 * 60 * 1000))
				})
				.save(null, {method:"insert"})
				.then(function (token){
				
					callback(null, token.access_token);
					
				}).catch(function(err) {return callback(err);});
				
				
			});
		}).catch(function(err) {
			console.log(err);
		});
		
	}).catch(function(err) {
		console.log(err);
	});;
	
}));

//User authorization endpoint
exports.authorization = [
	server.authorization(function(clientId, redirectUri, callback) {
		client
		.where({clientname:clientId})
		.fetch()
		.then(function (client) {
				return callback(null, client, redirectUri);
		})
		.catch(function(err) {return callback(err);});
  	}),
  	function(req, res){
	  	params = {
	  		transactionID: req.oauth2.transactionID, 
	  		user: req.user.toJSON().username, 
	  		client: req.oauth2.client.attributes.clientname 
	  	};
		res.render('token-dialog', params);
  	}
];

//User decision endpoint
exports.decision = [
	server.decision()
];

//Application client token exchange endpoint
exports.token = [
  server.token(),
  server.errorHandler()
];

function uid (len) {
	var 
		buf = [],
	    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
	    charlen = chars.length;

	for (var i = 0; i < len; ++i) {
		buf.push(chars[getRandomInt(0, charlen - 1)]);
	}

	return buf.join('');
};

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};






