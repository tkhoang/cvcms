var Promise = require ('promise');
const debug = require('debug')('cvdev-sandbox2:server');
utils = {
  toAssociativeTable: function (objectArray){
    
    var associativeTab = [];
    for(i in objectArray){
      associativeTab[objectArray[i].key] = objectArray[i].value;
    }
    return associativeTab;
  },
  
  initializeDbConfig: function (path){
    return new Promise(function(fulfill, reject){
    var fs = require('fs'),
        nconf = require('nconf'); 

    debug ('start initializeDbConfig %s ',path);
    try {
      fs.openSync(path,'r');
      debug ('%s opened', path);
      fulfill( nconf.argv()
        .env()
        .file({file:path}));
      } catch (err) {
        if (err.code == 'ENOENT'){
          try {
            fs.writeFileSync (
              path,
              '{\"dbConfig\":{\"client\":\"sqlite3\",\"connection\":{\"filename\":\"cv.db\" }},\"useNullAsDefault\": \"true\"}',
              'utf8'
            );
            fulfill( nconf.argv()
            .env()
            .file({file:path}));
          } catch (err){
            console.log(err)
            reject(err);
          }
        }else{
          console.log(err);
          reject(err);
        }
      }
    /*
    fs.open(path, 'r', (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error(path+' does not exist');
        fs.writeFile(
          path,
          '{\"dbConfig\":{\"client\":\"sqlite3\",\"connection\":{\"filename\":\"cv.db\" }},\"useNullAsDefault\": \"true\"}', 
          'utf8', 
          (err) => 
             {
               if (err){ 
                 console.log('err'+err);
                 reject(err);
               }else{
                fulfill( nconf.argv()
                   .env()
                   .file({file:path}));
                 //console.log ('utils nconf.get(dbConfig)= %j',nconf.get('dbConfig'));
              //   callback();
               }
             }
        );
      }else{
        console.error('error is '+err);
        reject (err);
      }
    }else{
      fulfill(nconf.argv()
        .env()
        .file({file:path}));
     // callback());
    }
    });//*/
  })}
};

module.exports = utils;
