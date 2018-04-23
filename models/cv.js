var bookshelf = require('./bookshelf');

var cv  = bookshelf.Model.extend({
	tableName: 'cv',
	experiences: function() {
		return this.hasMany(experiences, 'id');
	}
});

module.exports = cv;
