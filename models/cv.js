var bookshelf = require('./bookshelf');
var infos = require('./info');
var experiences = require('./experience');
var experiences_values = experiences.values; 
var key_skills = require('./keySkill');
var key_skills_values = key_skills.values; 

var cv  = bookshelf.Model.extend({
  tableName: 'cv',
    experiences_values: function() {
      return this.hasMany(experiences_values, 'cv_id').through(experiences);
    },
    experiences: function() {
      return this.hasMany(experiences, 'cv_id');
    },
    key_skills_values: function() {
      return this.hasMany(key_skills_values, 'cv_id').through(key_skills);
    },
    key_skills: function() {
      return this.hasMany(key_skills, 'cv_id');
    },
    infos: function () {
      return this.hasMany(infos, 'cv_id');
    }
  }
);

module.exports = cv;
