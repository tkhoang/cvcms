var 
	bookshelf 	= require('./bookshelf'), 
	tokens 		= require('./token');

var client = bookshelf.Model.extend({
	tableName: 'oauth_clients',
	tokens: function () {
		return this.hasMany(token, 'client_id');
	}
});

module.exports = client;