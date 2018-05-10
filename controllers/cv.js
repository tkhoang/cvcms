var cv = require('../models/cv');
const debug = require('debug')('cvdev-sandbox2:server');
/*
 * cv controller
 */

/*
 * getCv
 *  param 1 : http req
 *  param 2 : htt[ res
 */
exports.getCvs = function (req, res){
	
  cv
	.fetchAll()
	.then(function(cv){
		res.json(cv.toJSON());
	}).catch(function(err) {
	  console.error(err);
	});
	
};




/*
 * postCv
 *  param 1 : http req
 *  param 2 : htt[ res
 */
exports.postCv = function(req, res) {
  debug("creating a Cv", req.body);
  new cv ({title:req.body.title,
         status: 'draft',
         copyOf:null})
    .save(null, {method: 'insert'})
    .then(function(cv){
      res.json({message: 'cv inserted', data:cv.toJSON()});
    }).catch(function(err) {
      console.log(err.message);
      if ( new RegExp('duplicate key value').test(err.message))
      {
//        res.status(400);
        res.send({message: 'unique_constraint', description:'cv already exists'});
      }else
      {
//        res.status(400);
        res.send({message: 'cv not inserted', description:err});
      }
    });
};

exports.deleteCv = function(req, res){
  debug("deleting Cv",req.params.id);
  
  new cv ({id: req.params.id})
    .destroy()
    .then(function(err) {
      res.send({message: 'cv deleted', description:''});
    }).catch(function(err) {
      debug("error: ",err.message);
      res.send({message: 'cv not deleted', description:err.message});
    });
 
};

exports.getCv = function(req,res){
  debug("get cv :", req.params.id);

  cv
  .where('id','=',req.params.id)
  .fetch({withRelated: 
           [
             'infos', 
             'experiences', 
             'experiences_values',
             'key_skills',
             'key_skills_values' 
          ]
        })
  .then((cv)=>{
    res.json(cv);
  }).catch(err=>{
    debug("error: ",err.message);
    res.send( {message: 'error while getting cv', description: err.message});
  });
}
