var info = require('../models/info');

/*
 * info controller for getter and setter
 */

/*
 * info getter for the index page
 * param
 *  lang []
 *  callback (json)
 */
exports.getInfoByLangFront = function (lang, callback){
	info
	.where('language', 'in', lang)
	.fetchAll({columns:['key','value']})
	.then(function(info) {
	  callback(info.toJSON());
	}).catch(function(err) {
	  console.error(err);
	});
	
};

/*
 * API info getter - to use as param of router.route ()
 * return all infos
 * params : 
 *   callback res.json with all infos
 */
exports.getInfos = function(req, res){
	info
	.fetchAll()
	.then(function(infos) {
		res.json(infos.toJSON());
	}).catch(function(err) {
		  console.error(err);
		  res.send({message: 'get issue', description: err});
	});
};

/*
 * API info post - to use as param of router.route ()
 * insert a new info in table
 * params : req 
 *   req.body.key
 *           .language
 *           .value
 *   callback res.json with insert code
 */
exports.postInfos = function(req, res) {
	new info (req.body)
		.save(null, {method: 'insert'})
		.then(function(info){
			res.json({message: 'info inserted', data:info.toJSON()});
		}).catch(function(err) {
                        console.log(err.message);
			res.send({message: 'info not inserted', description:err});
		});
}

/*
 * API info getter - to use as param of router.route ()
 * return infos for a lang 
 * params : req
 *   req.params.lang
 *   callback res.json with * infos
 */
exports.getInfoByLangAPI = function (req, res) {
	info
	.where('language', '=', req.params.lang)
	.fetchAll()
	.then(function(info) {
	  res.json(info.toJSON());
	}).catch(function(err) {
	  console.error(err);
	  res.send({message: 'can\'t get info', description: err});
	});
}

/*
 * API info getter - to use as param of router.route ()
 * get info for a lang and a key
 * params : 
 *   req.params.lang
 *   		   .key
 *   callback res.json with 1 info
 */
exports.getInfoByLangAndKey = function (req, res) {
	info
	.where({language:req.params.lang, key:req.params.key})
	.fetch()
	.then(function(info) {
	  res.json(info.toJSON());
	}).catch(function(err) {
	  console.error(err);
	  res.send({message: 'can\'t get info', description: err});
	});
}

/*
 * API info setter - to use as param of router.route ()
 * update an info based on lang and key
 * params : req and res
 *   req.params.lang
 *             .key
 *      .body.value
 *   callback res.json with update code
 */
exports.putInfo = function (req, res) {
	info
	.where({id:req.params.id})
	.fetch()
	.then(function(info) {
		info
		.save(req.body)
		.then(function(info) {
			res.json({message: 'info updated', data: info.toJSON()});
		}).catch(function(err) {
			  console.error(err);
			  res.send({message: 'info not updated', description: err});
			});
	}).catch(function(err) {
	  console.error(err);
	  res.send({message: 'info not updated', description: err});
	});
}

/*
 * API info delete - to use as param of router.route ()
 * delete an info based on lang and key
 * params : req and res
 *   req.params.lang
 *             .key
 *   callback res.json with delete code
 */
exports.delInfoByLangAndKey = function (req, res) {
	info
	.where({language:req.params.lang, key:req.params.key})
	.fetch()
	.then(function(info) {
		info
		.destroy()
		.then(function(info) {
			res.json({message: 'info deleted', data: info.toJSON()});
		}).catch(function(err) {
			  console.error(err);
			  res.send({message: 'info not deleted', description: err});
			});
	}).catch(function(err) {
	  console.error(err);
	  res.send({message: 'info not deleted', description: err});
	});
}
