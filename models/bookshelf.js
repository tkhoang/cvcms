var nconf = require ('nconf');
var dbConfig = {
	client: 'pg',
	connection: {
		host     : 'localhost',
		port	 : '5432',
		user     : 'myapp',
		password : 'dbpass',
		database : 'myapp',
		charset  : 'utf8'
	}
};
var knex = require('knex')(dbConfig);
module.exports = require('bookshelf')(knex);