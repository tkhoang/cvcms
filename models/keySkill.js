var bookshelf = require('./bookshelf');

var key_skills_value = bookshelf.Model.extend({
  tableName: 'key_skills_values',
	key_skills: function () {
		return this.belongsTo(key_skills, 'id');
	}
});

var key_skills = bookshelf.Model.extend({
  tableName: 'key_skills',
	key_skills_value: function() {
		return this.hasMany(key_skills_value, 'id');
	}
});

module.exports = key_skills;
module.exports.values = key_skills_value;
