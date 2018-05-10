var bookshelf = require('./bookshelf');
var infos = require('./info');
var experiences = require('./experience');
var experiences_values = experiences.values; 
var key_skills = require('./keySkill');
var key_skills_values = key_skills.values; 

var cv  = bookshelf.Model.extend({
	tableName: 'cv',
	experiences_values: function() {
		return this.hasMany(experiences_values, 'id').through(experiences);
	},
	experiences: function() {
		return this.hasMany(experiences, 'id');
	},
	key_skills_values: function() {
		return this.hasMany(key_skills_values, 'id').through(key_skills);
	},
	key_skills: function() {
		return this.hasMany(key_skills, 'id');
	},
  infos: function () {
    return this.hasMany(infos, 'id');
  }
});

module.exports = cv;
