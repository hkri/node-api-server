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

// CRUD (View) Users table (MySQL)
router.get('/users', function(req, res) {
  var id = req.query.id;    // get the id param.
  var qry = require('./mysql/sqlconn.js');
  var ret;
  qry.viewUser(id, function(ret) {
    if(ret === 1) res.json({ message: 'Connection to database failed.' });
    else if(ret === 2) res.json({ message: 'No matches found.' });
    else res.json(ret);
  });
});

// CRUD (Insert) for users table (MySQL)
router.post('/users', function(req, res){
  var username  = req.body.username;
  var password  = req.body.password;
  var errors = [];
  if(username === undefined || username === '')
    errors.push('Error: please specify the username.');
  if(password === undefined || password === '')
    errors.push('Error: please specify the password.');
  if(errors.length > 0) {
    res.json({ message: 'One or more required fields are missing.', errors: errors });
    return;
  }
  var qry = require('./mysql/sqlconn.js');
  qry.addUser(username, password, function(ret) {
    if(ret === 3) res.json({ message: 'An error has occurred while adding the new record.' });
    else if(ret === 1) res.json({ message: 'The specified username already exists. Please try again.' });
    else if(ret === 2) res.json({ message: 'Failed to insert the new record.' });
    else if(ret === 0) res.json({ message: 'New record was successfully added.' });
  });
});

// CRUD (View) for sample Employees record json.
router.get('/employees', function(req, res) {
  var eid = req.query.id;     // stores the employee id requested.
  if(eid === undefined) res.json({ message: 'Invalid request.' });
  else {
    var manager = require('./functions/employees-manager');
    var data = manager.getEmployee(eid);
    if(data === 1) res.json({ message: 'No match found for employee with ID: ' + eid });
    else res.json(data);
  }
});

// CRUD (Create) for sample Employees record json.
router.post('/employees', function(req, res) {
  // Gets the required data for creating new employee data.
  var fn, ln, gndr;
  fn    = req.body.firstname;
  ln    = req.body.lastname;
  gndr  = req.body.gender;

  // Perform validations here.
  var errors = [];
  if(fn === undefined || fn === '')     { errors.push('Error: First name is required.');  }
  if(ln === undefined || ln === '')     { errors.push('Error: Last name is required.');   }
  if(gndr === undefined || gndr === '') { errors.push('Error: Gender is required.');      }

  if(errors.length > 0) {
    res.json({ message: "Operation failed - one or more required fields are missing." , errors});
    return false;  // Stop execution here due to validation failure.
  }

  // Access the data manager to insert new record.
  var manager = require('./functions/employees-manager');
  var eid = manager.addEmployee(fn, ln, gndr); // Returns the employee id of the new employee.
  if(eid === 1) res.json({ message: 'An error has occurred while creating a new employee record.' });
  else res.json({ message: 'A new employee with ID ' + eid + ' was successfully created.' });

});

// CRUD (Update) for sample Employees record json.
router.put('/employees', function(req, res) {
  // Gets the required data for creating new employee data.
  var id, fn, ln, gndr;
  id    = req.body.id;
  fn    = req.body.firstname;
  ln    = req.body.lastname;
  gndr  = req.body.gender;

  // Perform validations here.
  var errors = [];
  if(id === undefined || id === '')     { errors.push('Error: Employee ID is required.');  }

  if(errors.length > 0) {
    res.json({ message: "Operation failed - a required field is missing." , errors});
    return false;  // Stop execution here due to validation failure.
  }

  // Access the data manager to insert new record.
  var manager = require('./functions/employees-manager');
  var ok = manager.updateEmployee(id, fn, ln, gndr); // Returns the employee id of the new employee.
  if(ok === 1) res.json({ message: 'A record for employee ' + id + ' does not exist.' });
  else if(ok === 2) res.json({ message: 'No fields were specified for updating.' });
  else res.json({ message: 'Employee ' + id + ' was successfully updated.' });

});

// CRUD (Delete) for sample Employees record json.
router.delete('/employees', function(req, res) {
  // Gets the required data for creating new employee data.
  var id;
  id = req.body.id;

  // Perform validations here.
  var errors = [];
  if(id === undefined || id === '')     { errors.push('Error: Employee ID is required.');  }

  if(errors.length > 0) {
    res.json({ message: "Operation failed - a required field is missing." , errors});
    return false;  // Stop execution here due to validation failure.
  }

  // Access the data manager to insert new record.
  var manager = require('./functions/employees-manager');
  var ok = manager.deleteEmployee(id); // Returns the employee id of the new employee.
  if(ok === 1) res.json({ message: 'Employee with id ' + id + ' does not exist.' });
  else res.json({ message: 'Employee ' + id + ' was successfully deleted.' });

});

// Register routes
// Add a prefix to our route.
server.use(settings.prefix, router);

// Start the server.
server.listen(settings.port);
console.log('API Server running on port ' + settings.port);
