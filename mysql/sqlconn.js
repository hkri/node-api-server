/*
 * sqlconn.js
 * SQL Connection using NodeJS.
 * Created by: John Espiritu
 * June 21, 2017
*/

// Create a new MySQL Connection instance.
var mysql   = require('mysql');
var conn    = mysql.createConnection({
  host      : '127.0.0.1',
  user      : 'root',
  password  : 'admin',
  database  : 'test'
});

module.exports = {

  // Establish a connection to the database.
  open: function() {
    conn.connect(function(err){
      if(err) {
        console.error('Error connection: ' + err.stack);
        return;
      }
      console.log('Connected (ID: ' + conn.threadId);
    });
  },

  // Close any open connection.
  close: function() {
    conn.end();
  },

  // View the users in the table.
  viewUser: function(id, result) {
    conn.query('SELECT * FROM Users WHERE username=?', [id], function(error, results, fields){
      if(error) result(1);
      else {
        if(results.length <= 0) result(2);
        else result(results[0]);
      }
    });
  },

  // Insert users into the table.
  addUser: function(username, password, result) {
    conn.query('INSERT INTO Users Values(?, ?)', [username, password], function(error, results, fields){
      // Error 1062 - Primary Key exists.
      if(error) {
        if(error.errno === 1062) result(1);
        else result(3);
      } else {
        if(results.affectedRows <= 0) result(2);
        else result(0);
      }
    });
  }

};
