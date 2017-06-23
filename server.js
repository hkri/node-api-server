/*
 * server.js
 * A simple NodeJS API server.
 * Created by: John Espiritu
 * June 21, 2017
*/

// Import the local config file.
var settings  = require('./config/config');           // local config file.
var routes    = require('./config/server-routes')     // local routes file.

// Use Express
var express   = require('express');                   // use express package.
var server    = express();                            // initiate express framework.

// Use JSON parser.
var parser    = require('body-parser');               // used for parsing JSON.

// Import other packages.
var df        = require('dateformat');                // For formatting dates/time.

// Define a timestamping function (for console logging).
var postTime = function() { return '[' + df(new Date(), 'HH:mm:ss') + '] '; }

// Show welcome message.
console.log('\nWelcome to Node API Server');
console.log('\n' + postTime() + 'Initializing...')

// Config Express server.
server.use(parser.urlencoded({ extended: true }));
server.use(parser.json());

// Define the API routes.
var router = express.Router();  // instance of Express router.

// Iterate and listen to the routes specified in server-routes file.
console.log(postTime() + "Setting up routes...\n");
for(var key in routes.api) {
  // Log and register routes.
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

// Ping route.
router.get('/', function(req, res) {
  res.json({ message: 'All systems operational.' });
});

// Register routes
// Add a prefix to our route.
server.use(settings.prefix, router);

// Start the server.
server.listen(settings.port);
console.log('\n' + postTime() + 'Setup done. Server up on port ' + settings.port + '.\n');
