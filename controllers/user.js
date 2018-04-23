var user = require('../models/user');
var uuid = require('node-uuid');
const debug = require('debug')('cvdev-sandbox2:server');

exports.postUsers = function(req, res) {
	debug("creating a new user", req.body);
	new user ({uuid: uuid.v1(), 
			   username:req.body.username, 
			   password: req.body.password, 
			   email:req.body.email})
		.save(null, {method: 'insert'})
		.then(function(user){
			res.json({message: 'user inserted', data:user.toJSON()});
		}).catch(function(err) {
      console.log(err.message);
      if ( new RegExp('duplicate key value').test(err.message))
      {
//        res.status(400);
        res.send({message: 'unique_constraint', description:'user already exists'});
      }else
      {
//        res.status(400);
			  res.send({message: 'user not inserted', description:err});
      }
		});
};

exports.getUsers = function(req, res) {
	user
	.where({username:req.params.username})
	.fetch()
	.then(function(user) {
		if(!user) { res.json({message: 'unfound'}); }
		else{res.json(user.toJSON());}
	}).catch(function(err) {
	  res.send({message: 'can\'t get user', description: err});
	});

};

exports.testUserPassword = function(req, res) {
	console.log(" test password ");
	user
	.where({username:req.params.username})
	.fetch()
	.then(function(user) {
		user.verifyPassword(req.params.password, function (param1, param2){
			res.json(user.toJSON());
			
		});
	}).catch(function(err) {
	  res.send({message: 'can\'t get user', description: err});
	});
}
;
