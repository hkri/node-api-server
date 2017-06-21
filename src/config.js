/*
 * config.js
 * Configuration for the server.
*/

module.exports = function() {

  // Define the port to use.
  this.port = process.env.PORT || 8080;

  // Define the route prefix.
  this.prefix = '/api';

};
