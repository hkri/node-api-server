/*
 * employees-manager.js
 * Contains functions to manipulate data from employees.json
 */

// Local members.
var padInt = function(num, len) {
  var out = num + "";
  while(out.length < len) out = "0" + out;
  return out;
};

var createNewID = function(arr) {
  // Gets the last element.
  var nextID;
  var len = Object.keys(arr).length;
  var lastID = Object.keys(arr)[len - 1];
  if(lastID === undefined) nextID = 0;
  else nextID = parseInt(lastID.split('-')[1]) + 1;
  return 'EMP-' + padInt(nextID, 3);
};

// Exposed members.
module.exports = {

  // Finds and returns the employee info based on given id.
  getEmployee: function(eid) {
    // Require file system.
    var fs = require('fs');

    // Write some log.
    console.log('[GET] Get employee with id: ' + eid);

    // Parse the json record.
    var rec = JSON.parse(fs.readFileSync('./data/employees.json', 'utf8'));

    // Return false if no record found, else return the object.
    if(rec === undefined || rec[eid] === undefined) return 1;
    else {
      return rec[eid];
    }

  },

  deleteEmployee: function(id) {
    // Require file system.
    var fs = require('fs');

    // Write some log.
    console.log('[DELETE] Deleting employee with id: ' + id);

    // Parse the json record.
    var rec = JSON.parse(fs.readFileSync('./data/employees.json', 'utf8'));

    // Return false if no record found, else return the object.
    if(rec === undefined || rec[id] === undefined) return 1;
    else {
      delete rec[id];
      fs.writeFileSync('./data/employees.json', JSON.stringify(rec), 'utf8');
      console.log('Employee ' + id + ' successfully deleted.');
      return true;
    }

  },

  // Creates a new employee record.
  addEmployee: function(fn, ln , gender) {
    // Require file system.
    var fs = require('fs');

    // Write some log.
    console.log("[POST] Creating new employee...");

    // Parse the json record.
    var rec = JSON.parse(fs.readFileSync('./data/employees.json', 'utf8'));

    // Perform some simple validations.
    if(fn === undefined || ln === undefined || gender === undefined) return 1;

    // Insert record into the data collection.
    var new_data = {
      "FirstName": fn,
      "LastName": ln,
      "Gender": gender
    };
    var neid = createNewID(rec);
    rec[neid] = new_data;

    // Save to JSON file.
    fs.writeFileSync('./data/employees.json', JSON.stringify(rec), 'utf8');

    // Write some log.
    console.log("[POST] New employee successfully added.");

    return neid;  // Signals that a new employee was successfully created, return tne new employee's id.
  },

  // Update the specified employee record.
  updateEmployee: function(eid, fn, ln, gender) {
    // Require file system.
    var fs = require('fs');

    // Write some log.
    console.log("[PUT] Updating employee " + eid);

    // Parse the json record.
    var rec = JSON.parse(fs.readFileSync('./data/employees.json', 'utf8'));

    // Perform some simple validations.
    if(eid === undefined || eid === '' || rec[eid] === undefined) return 1;   // Error code 1 - record not found.

    // Update the specified field of the record.
    var fields_updated = 0;
    if(fn !== undefined && fn !== '') {
      rec[eid]["FirstName"] = fn;
      fields_updated++;
    }
    if(ln !== undefined && ln !== ''){
      rec[eid]["LastName"] = ln;
      fields_updated++;
    }
    if(gender !== undefined && gender !== '') {
      rec[eid]["Gender"] = gender;
      fields_updated++;
    }

    if(fields_updated <= 0) return 2; // Error code 2 - no fields specified.

    // Save to JSON file.
    fs.writeFileSync('./data/employees.json', JSON.stringify(rec), 'utf8');

    // Write some log.
    console.log("[PUT] Employee " + eid + " has been updated.");

    return 0;  // Signals that the employee record was updated.
  }

};
