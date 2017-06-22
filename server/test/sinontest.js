var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var index = require('../index');
var moviecontrol = require('../controller/moviecontrol'); 
var authencontrol = require('../controller/logiccontrol');
var movie = require('../models/schema');
var login = require('../models/newschema');
var url = request("http://localhost:3000");

var moviestub = sinon.stub(movie,'find');
var loginstub = sinon.stub(login,'find');

//test case to find the movie in favourite list
describe('movie in favourite list',function(err){
       beforeEach(function(){
        moviestub.yields(null,[{'title':'Barfi'}]);
    });
       it('Matches the find movies',function(done){
           url       
           .get('/movie/view')  
           .expect(200)     
           .expect('Content-Type', /json/)  
           .end(function(err, res){
               if (err) return done(err);     
               //Enter your assertions here  
               expect(res.body[0].title).to.be.equal("Barfi"); 
               done();
    });
  }); 
});


//test case to find the user in database
describe('Finds the user in Database ',function(err){
       beforeEach(function(){
        loginstub.withArgs({username:'hameed'}).returns({"email":"hameed@gmail.com"});
    });
       it('Matches the User',function(done){
           url       
           .post('/signup')  
           .expect(302)       
           .end(function(err, res){
               if (err) return done(err);     
               //Enter your assertions here  
               expect(loginstub({username:'hameed'}).email).to.be.equal("hameed@gmail.com"); 
               done();
    });
  }); 
});
