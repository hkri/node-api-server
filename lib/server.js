/*
  Node API Server
  John Espiritu, Cloud Cheetah
*/

// Import the local config file.
var settings  = require('./config');           // local config file.
var routes    = require('./server-routes')     // local routes file.

// Use Express
var express   = require('express');                   // use express package.
var server    = express();                            // initialize express framework.

// Use JSON parser.
var parser    = require('body-parser');               // used for parsing JSON.

// Import other packages.
var df        = require('dateformat');                // For formatting dates/time.

// Define a timestamping function (for console logging).
var postTime = function() { return '[' + df(new Date(), 'HH:mm:ss') + '] '; };

// Server object.
function app() {

  // Setup the server.
  this.init = function() {
    console.log('\n' + postTime() + 'Setting up the server...');
    server.use(parser.urlencoded({ extended: true }));
    server.use(parser.json());
    console.log(postTime() + 'Setup done.');
  }

  // Expose the routes collection.
  this.routes = routes;

  // Start server.
  function start() {

    console.log(postTime() + 'Starting server...');

    var router = express.Router();

    // Register routes.
    console.log(postTime() + "Setting up routes...\n");
    for(var key in routes.api) {
      var api = routes.api[key], verbs = [];
      if(api.get !== undefined) {
        verbs.push('GET');
        router.get(api.path, api.get);
      }
      if(api.post !== undefined) {
        verbs.push('POST');
        router.post(api.path, api.post);
      }
      if(api.put !== undefined) {
        verbs.push('PUT');
        router.put(api.path, api.put);
      }
      if(api.delete !== undefined) {
        verbs.push('DELETE');
        router.delete(api.path, api.delete);
      }
      console.log('\t' + key + ' (' + api.path + ') -> ' + verbs);
    }

    // Prefix.
    server.use(settings.prefix, router);

    // Listen.
    server.listen(settings.port);
    console.log('\n' + postTime() + 'Done. Server started on port: ' + settings.port + '.\n');
  }

};

module.exports = app;
