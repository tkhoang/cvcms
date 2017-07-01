var experience = require('../models/experience');

/*
 * experience controller
 */

/*
 * getExperiencesValuesByLang
 *  param 1 : lang []
 *  param 2 : callback (tab)
 */
exports.getExperiencesValuesByLang = function (lang, callback){
	
	experience.values
	.where('language', 'in', lang)
	.fetchAll({withRelated: ['experiences']})
	.then(function(experiencesValues){
		var tab = [];
		tmpjson = experiencesValues.toJSON().sort(function (a,b) { return a.experiences.start_date<b.experiences.start_date ; });
		for (i in tmpjson){
			var tmpStartDate = tmpjson[i].experiences.start_date;
			var tmpEndDate = tmpjson[i].experiences.end_date;
			var experience = {
				type		 :  tmpjson[i].experiences.type,
				start_month	 : (tmpStartDate!=null?tmpStartDate.getMonth():null),
				start_year	 : (tmpStartDate!=null?tmpStartDate.getFullYear():null),
				end_month	 : (tmpEndDate!=null?tmpEndDate.getMonth():null),
				end_year	 : (tmpEndDate!=null?tmpEndDate.getFullYear():null),
				establishment:  tmpjson[i].experiences.establishment,
				location	 :  tmpjson[i].experiences.location,
				title		 :  tmpjson[i].title,
				description	 :  tmpjson[i].description
			};
			tab[i]=experience;
		}
		callback(tab);
	}).catch(function(err) {
	  console.error(err);
	});
	
};