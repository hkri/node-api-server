/*
 * employees-manager.js
 * Contains functions to manipulate data from employees.json
 */

 module.exports = {

   // Finds and returns the employee info based on given id.
   getEmployee: function(eid) {
     // Require FileSync.
     var fs = require('fs');

     // Write some log.
     console.log("[GET] Get employee with id: " + eid);

     // Retrieve record by employee id.
     var rec = JSON.parse(fs.readFileSync('./data/employees.json', 'utf8'));

     // Return false if no record found, else return the object.
     if(rec === undefined || rec[eid] === undefined) return false;
     else {
       return rec[eid];
     }

   }

 };
