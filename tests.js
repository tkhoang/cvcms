var superagent = require('superagent');
var expect = require('expect.js');

describe('homepage', function(){
	  it('should respond to GET',function(){
	    superagent
	      .get('http://0.0.0.0:3000/')
	      .end(function(res){
	    	  console.log(res.status);
	        expect(res.status).to.equal(200);
	    })
	  })
});
