/*
  Node.js API Server Package
  John Espiritu (c) June 2017
  Cloud Cheetah
*/

/* Local Test.
var server = require('./lib/server');

server.init();
server.setPrefix('/');
server.setPort(3030);

var api = server.routes.add('myapi', '/myapi');
api.get = function(req, res) {
  res.json({ message: 'Hello, world!' });
}

console.log(server.routes.get('myapi'));
server.routes.remove('dmyapi');
console.log(server.routes.get('myapi'));

server.start();
*/

module.exports = require('./lib/server');
