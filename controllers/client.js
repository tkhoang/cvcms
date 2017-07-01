var client = require ('../models/client');
var uuid = require('node-uuid');

exports.postClients = function (req, res){
	new client({
		uuid: uuid.v1(),
		clientname: req.body.name,
		secret: req.body.secret,
		redirect_uri: req.body.redirect_uri,
		created_by:req.user.id})
	.save(null, {method: 'insert'})
	.then(function(client){
		res.json({message: 'client inserted', data:client.toJSON()});
	}).catch(client.NoRowsUpdatedError, function(err) {
		res.send({message: 'client not inserted - no row updated', description:err});
	}).catch(function(err) {
		res.send({message: 'client not inserted - err catched', description:err});
	});
};

exports.getClients = function (req,res){
	client
	.where('created_by', req.user.id)
	.fetchAll()
	.then(function(client) {
		res.json(client.toJSON());
	}).catch(function(err) {
	  console.error(err);
	});
};