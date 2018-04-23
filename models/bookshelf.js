var nconf = require ('nconf');
var path = require('path');
var dbConfig = nconf.get('dbConfig');
//console.log ('bookshelf nconf.get(dbConfig)=%j',nconf.get('dbConfig'));
/* {
	
	client: 'pg',
	connection: {
		host     : 'localhost',
		port	 : '5432',
		user     : 'myapp',
		password : 'dbpass',
		database : 'myapp',
		charset  : 'utf8'
	}
	client: 'sqlite3',
	connection: { filename: dbFile }
};*/
var knex = require('knex')(dbConfig);
module.exports = require('bookshelf')(knex);
