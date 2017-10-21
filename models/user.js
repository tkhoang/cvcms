var 
  bookshelf = require('./bookshelf'),
  bcrypt    = require('bcrypt-nodejs'),
  tokens    = require('./token'),
  Promise   = require('bluebird');

var user = bookshelf.Model.extend({
  tableName: 'users',
  tokens: function(){
    return this.thisMany(tokens,'user_id');
  },
  constructor: function() {
      var self = this;
      bookshelf.Model.apply(this, arguments);
      this.on('creating', function(model) {
          if(!model.attributes.password) {
              delete model.attributes.password;
          } else {
              return self.hashPassword(model.attributes.password)
              .then(function(hash) {
                  model.set({ password: hash });
              });
          }
      });
  },
  hashPassword: function(password) {
      return new Promise(function(resolve, reject) {
          bcrypt.genSalt(10, function(error, salt) {
              if(error) return reject(error);

              bcrypt.hash(password, salt, null, function(error, hash) {
                  if(error) return reject(error);
                  return resolve(hash);
              });
          });
      });
  },
  verifyPassword: function(password, callback){
    
    bcrypt.compare(password, this.attributes.password, function(err, isMatch){
      if(err) return callback(err);
      callback (null, isMatch);
    });
  }
});

module.exports = user;
