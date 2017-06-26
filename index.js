/*
  Node.js API Server Package
  John Espiritu (c) June 2017
  Cloud Cheetah
*/

var server = require('./lib/server');

server.init();

var api = server.routes.add('myapi', '/api');
api.get = function(req, res) {
  res.json({ message: 'Hello, world!' });
}

server.start();
