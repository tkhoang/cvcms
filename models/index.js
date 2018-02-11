var bookshelf = require('./bookshelf');
var Promise  = require('promise');
const debug = require('debug')('cvdev-sandbox2:server');

models = {
  createSchema: function (cb) {
    //return new Promise (function(fulfill, reject){ 
    debug ('starting database checking');
    bookshelf.knex.schema.createTableIfNotExists('cv', function (table){
      table.increments().primary();
      table.string('title',150);
      table.string('status',50);
      table.datetime('creation_time');
      table.datetime('modification_time');
      table.integer('copyOf');
    }).createTableIfNotExists('infos', function (table){
      table.increments().primary();
      table.string ('key',150);
      table.string ('language',8);
      table.text ('value');
    }).createTableIfNotExists('experiences', function (table){
      table.increments().primary() ;
      table.string('type',30);
      table.datetime('start_time');
      table.datetime('end_time');
      table.string ('establishment',150);
      table.string ('location',150);
    }).createTableIfNotExists('experiences_values', function (table){
      table.increments().primary();
      table.string ('language',8);
      table.string ('title',150);
      table.text ('description');
    }).createTableIfNotExists('key_skills', function (table){
      table.increments().primary();
    }).createTableIfNotExists('key_skills_values', function (table){
      table.increments().primary();
      table.string ('language',8); 
      table.string ('name',150);
      table.text ('description');	
    }).createTableIfNotExists('oauth_codes', function (table){
      table.text ('value').notNullable();
      table.integer('client_id').notNullable();
      table.text('redirect_uri').notNullable();      	
    }).createTableIfNotExists('oauth_access_tokens', function (table){
      table.text ('access_token').notNullable();
      table.integer('client_id').notNullable();
      table.integer('user_id').notNullable();  
      table.timestamp('expires'); 
		
    }).createTableIfNotExists('oauth_clients', function (table){
      table.increments('íd');
      table.uuid('uuid');
      table.string('clientname',30).notNullable();
      //table.unique('clientname');
      table.text('secret').notNullable();
      table.integer('client_id');
      //table.unique (['clientname','secret'], 'client_clientname_secret');
    }).createTableIfNotExists('users', function (table){
      table.increments();
      table.uuid('uuid');
      table.string('username',30).notNullable();
     //table.unique('username');
      table.text('password',100);
      table.string('email',50);
      //table.unique (['username','password'], 'users_username_password');
		
    }).createTableIfNotExists('parameters', function (table){
      table.string('key',50).notNullable();
      table.text('value');
		
    }).then(function (){
      debug('finishing database checking');
    //  fulfill();
      cb();
   });
  //  })
  },

  isInitialized: function (callback){
    var user = require('./user');
    user.count().then((count)=>{
      if (count==0){
        callback.notInitialiazed()
      }else{
        callback.initialiazed();
      }
    }); 
  }
}

module.exports = models;
