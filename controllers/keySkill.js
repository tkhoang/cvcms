var keySkillValue = require('../models/keySkillValue');

exports.getKeySkillValueByLang = function (lang, callback){
	
	keySkillValue
		.where('language', 'in', lang)
		.fetchAll({columns:['id', 'name', 'description']})
		.then(function(keySkillValue) {
		  callback(keySkillValue.toJSON());
		}).catch(function(err) {
		  console.error(err);
		});
	
};