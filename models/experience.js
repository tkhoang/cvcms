var bookshelf = require('./bookshelf');

var experiencesValues = bookshelf.Model.extend({
	tableName: 'experiences_values',
	experiences: function () {
		return this.belongsTo(experiences, 'id');
	}
});

var experiences = bookshelf.Model.extend({
	tableName: 'experiences',
	experiencesValues: function() {
		return this.hasMany(experiencesValues, 'id');
	}
});

module.exports = experiences;
module.exports.values = experiencesValues;