/*
  Node.js API Server Package
  John Espiritu (c) June 2017
  Cloud Cheetah
*/

//module.exports = require('./lib/server.js');

var svr = require('./lib/server');

/* This shit's always undefined.
function User() {

  this.fA = function() {
    console.log('Hello, from function A');
  }
  this.fB = function() {
    console.log('Hello, from function B');
  }
};

var u = User();
u.fA();
*/

function User(your_message) {
  var me = { };
  me.fA = function() {
    console.log(your_message + ' -- function A');
  }

  me.fB = function() {
    console.log(your_message + ' -- function B');
  }
  return me;
}

var userA = User('nakakabangag');
userA.fA();

var userB = User('Hello');
userB.fA();
userA.fA();
