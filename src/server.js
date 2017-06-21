/*
 * server.js
 * A simple NodeJS API server.
 * Created by: John Espiritu
 * June 21, 2017
*/

// Import the local config file.
var settings    = require('./config');        // local config file.

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
  var msg = req.query.msg;
  if(msg !== undefined)
    res.json({ message: msg });
  else
    res.json({ message: 'Invalid request.' });
});

/* TODO: ADD MORE ROUTES HERE */
router.post('/', function(req, res) {
  res.json({ message: '[POST] All systems operational.' });
});

// CRUD for sample Employees record json.
router.get('/employees', function(req, res) {
  var eid = req.query.id;     // stores the employee id requested.
  if(eid === undefined) res.json({ message: 'Invalid request.' });
  else {
    var manager = require('./functions/employees-manager');
    var data = manager.getEmployee(eid);
    if(data === false) res.json({ message: 'No match found for employee with ID: ' + eid });
    else res.json(data);
  }
});

// Register routes
// Add a prefix to our route.
server.use(settings.prefix, router);

// Start the server.
server.listen(settings.port);
console.log('API Server running on port ' + settings.port);
