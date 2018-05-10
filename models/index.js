var bookshelf = require('./bookshelf');
var Promise  = require('promise');
const debug = require('debug')('cvdev-sandbox2:server');

models = {
  /*
  * checking the table and create a table if missing.
  */
  createSchema: function (cb) {
    debug ('starting database checking');    
    bookshelf.knex.schema.hasTable('users').then(function(exists) {
      if (!exists) {
        return bookshelf.knex.schema.createTable('users', function(table) {
          debug ('creating table users');
	      table.increments();
          table.uuid('uuid');
          table.string('username',30).notNullable();
          table.unique('username');
          table.text('password',100);
          table.string('email',50);
          table.unique (['username','password'], 'users_username_password');
        });
	  }
    }).then(function (){
      debug('table users checked');
	}).then(function () {	
	  bookshelf.knex.schema.hasTable('cv').then(function(exists) {
        if (!exists) {
          return bookshelf.knex.schema.createTable('cv', function(table) {
            debug ('creating table cv');
             table.increments().primary();
             table.string('title',150);
             table.string('status',50);
             table.datetime('creation_time');
             table.datetime('modification_time');
             table.integer('copyOf');
          });
	    }
      }).then(function (){
        debug('table cv checked');
	  });
	}).then(function () {	
	  bookshelf.knex.schema.hasTable('infos').then(function(exists) {
        if (!exists) {
          return bookshelf.knex.schema.createTable('infos', function(table) {
            debug ('creating table infos');
            table.increments().primary();
            table.string ('key',150);
            table.string ('language',8);
            table.text ('value');
            table.integer('cv_id');
            table.foreign('cv_id').references('id').inTable('cv');
          });
	    }
      }).then(function (){
        debug('table infos checked');
	  });
	}).then(function () {	
	  bookshelf.knex.schema.hasTable('experiences').then(function(exists) {
        if (!exists) {
          return bookshelf.knex.schema.createTable('experiences', function(table) {
            debug ('creating table experiences');
            table.increments().primary() ;
            table.string('type',30);
            table.datetime('start_time');
            table.datetime('end_time');
            table.string ('establishment',150);
            table.string ('location',150);
            table.integer('cv_id');
            table.foreign('cv_id').references('id').inTable('cv');
          });
	    }
      }).then(function (){
        debug('table experiences checked');
	  });
	}).then(function () {	
	  bookshelf.knex.schema.hasTable('experiences_values').then(function(exists) {
        if (!exists) {
          return bookshelf.knex.schema.createTable('experiences_values', function(table) {
            debug ('creating table experiences_values');
            table.increments().primary();
            table.string ('language',8);
            table.string ('title',150);
            table.text ('description');
            table.integer('experience_id');
            table.foreign('experience_id').references('id').inTable('experiences');
          });
	    }
      }).then(function (){
        debug('table experiences_values checked');
	  });
	}).then(function () {	
	  bookshelf.knex.schema.hasTable('key_skills').then(function(exists) {
        if (!exists) {
          return bookshelf.knex.schema.createTable('key_skills', function(table) {
            debug ('creating table key_skills');
            table.increments().primary();
            table.integer('cv_id');
            table.foreign('cv_id').references('id').inTable('cv');
          });
	    }
      }).then(function (){
        debug('table key_skills checked');
	  });
	}).then(function () {	
	  bookshelf.knex.schema.hasTable('key_skills_values').then(function(exists) {
        if (!exists) {
          return bookshelf.knex.schema.createTable('key_skills_values', function(table) {
            debug ('creating table key_skills_values');
            table.increments().primary();
            table.string ('language',8); 
            table.string ('name',150);
            table.text ('description');	
            table.integer('key_skill_id');
            table.foreign('key_skill_id').references('id').inTable('key_skills');
          });
	    }
      }).then(function (){
        debug('table key_skills_values checked');
	  });
	}).then(function () {	
	  bookshelf.knex.schema.hasTable('oauth_codes').then(function(exists) {
        if (!exists) {
          return bookshelf.knex.schema.createTable('oauth_codes', function(table) {
            debug ('creating table oauth_codes');
            table.text ('value').notNullable();
            table.integer('client_id').notNullable();
            table.text('redirect_uri').notNullable();      	
          });
	    }
      }).then(function (){
        debug('table oauth_codes checked');
	  });
	}).then(function () {	
	  bookshelf.knex.schema.hasTable('oauth_access_tokens').then(function(exists) {
        if (!exists) {
          return bookshelf.knex.schema.createTable('oauth_access_tokens', function(table) {
            debug ('creating table oauth_access_tokens');
            table.text ('access_token').notNullable();
            table.integer('client_id').notNullable();
            table.integer('user_id').notNullable();  
            table.timestamp('expires'); 
          });
	    }
      }).then(function (){
        debug('table oauth_access_tokens checked');
	  });
	}).then(function () {	
	  bookshelf.knex.schema.hasTable('oauth_clients').then(function(exists) {
        if (!exists) {
          return bookshelf.knex.schema.createTable('oauth_clients', function(table) {
            debug ('creating table oauth_clients');
            table.increments('íd');
            table.uuid('uuid');
            table.string('clientname',30).notNullable();
            table.unique('clientname');
            table.text('secret').notNullable();
            table.integer('client_id');
            table.unique (['clientname','secret'], 'client_clientname_secret');
          });
	    }
      }).then(function (){
        debug('table oauth_clients checked');
	  });
	}).then(function () {	
	  bookshelf.knex.schema.hasTable('parameters').then(function(exists) {
        if (!exists) {
          return bookshelf.knex.schema.createTable('parameters', function(table) {
            debug ('creating table parameters');
            table.string('key',50).notNullable();
            table.text('value');
          });
	    }
      }).then(function (){
        debug('table parameters checked');
		cb();
	  });
	})
  
  },
  /*
  * checking if there at least one user.
  */
  isInitialized: function (callback){
    var user = require('./user');
    user.count().then((count)=>{
      debug ('nb user in db :',count);    
      callback(count>0);
    }); 
  }
}

module.exports = models;
