/*
 * server.js
 * A simple NodeJS API server.
 * Created by: John Espiritu
 * June 21, 2017
*/

// Import the local config file.
var settings    = require('config');        // local config file.

// Use express framework.
var express     = require('express');       // use express package.
var server      = express();                // initiate express framework.

// Use JSON parser.
var parser      = require('body-parser');   // used for parsing JSON.

// Get data from POST.
server.use(parser.urlencoded({ extended: true }));
server.use(parser.json());

// Define the API routes.
var router = express.Router();  // instance of Express router.

// Test route.
router.get('/', function(req, res) {
  res.json({ message: 'All systems operational.' });
});

/* TODO: ADD MORE ROUTES HERE*/

// Register routes
// Add a prefix to our route.
server.use(settings.prefix, router);

// Start the server.
server.listen(settings.port);
console.log('API Server Instance running on port ' + settings.port);
