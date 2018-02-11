var assert = require('assert');
var request = require('supertest');


const fs = require('fs');

describe ('Configuration initialization tests with SQLLite', function () {

  before(async function() {

    await fs.unlinkSync('./cv.db');
  });

  after(async function() {
    await fs.unlinkSync('./test.json');
  });

  it('should create a configuration file', function (done) { 
    var utils = require ('../utils');
    utils.initializeDbConfig('./test.json', ()=>{
    fs.access('./test.json', (err)=> {
      if(err){ 
        done(err);
      }
      else {
        done ();
      }
    });
   }); 
  });
  it('should create a database schema', function (done) {
    var db = require ('../models');
    db.createSchema( function (){
    fs.access('./cv.db', (err)=> {
      if(err){
        done(err);
      }
      else {
        done ();
      }
    })});
  });
  it('should not be initialized', function (done){
    var db = require ('../models');
    var callback = {
      notInitialiazed () {
        done();
      },       
     initialiazed () {
       done('is already initialized');
      }
    }
    db.isInitialized(callback);
  });
  
});

