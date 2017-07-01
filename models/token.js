var 
	bookshelf 	= require('./bookshelf'),
	clients 	= require('./client'),
	users		= require('./user');

var token = bookshelf.Model.extend({
	tableName: 'oauth_access_tokens',
	idAttribute: 'access_token',
	clients: function () {
		return this.belongsTo(clients, 'id');
	},
	users: function (){
		return this.belongsTo(users, 'id')
	}
});

module.exports = token;