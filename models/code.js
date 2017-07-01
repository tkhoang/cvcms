var 
	bookshelf 	= require('./bookshelf'),
	clients 	= require('./client'),
	users		= require('./user');

var code = bookshelf.Model.extend({
	tableName: 'oauth_codes',
	idAttribute: 'value',
	clients: function () {
		return this.belongsTo(clients, 'id');
	},
	users: function (){
		return this.belongsTo(users, 'id')
	}
});

module.exports = code;