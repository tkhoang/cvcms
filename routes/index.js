var express = require('express');
var router = express.Router();
var nconf = require('nconf');
var info = require('../controllers/info.js');
var experiences = require('../controllers/experience.js');
var keySkills = require('../controllers/keySkill.js');
var i18n = require("i18n");
var utils = require('../utils');

/* GET home page. */
router.get('/', function(req, res, next) {
	
	i18n.setLocale('en');
	
	var locals = ["en","no-local"];
	
	//*
	info.getInfoByLangFront(locals,function(ObjInfos){
		experiences.getExperiencesValuesByLang(locals, function (ObjExperiencesValues){
			 keySkills.getKeySkillValueByLang(locals,function(ObjKeySkills){
				 ObjInfos = utils.toAssociativeTable(ObjInfos);
				 var params = { 
						title: ObjInfos.NAME+", "+ObjInfos.POSITION, 
					 	infos: ObjInfos, 
					 	experiences: ObjExperiencesValues,
					 	keyskills: ObjKeySkills
					 };
				 res.render('index', params);
			 });
		});
	 });	
	 //*/
});

module.exports = router;
