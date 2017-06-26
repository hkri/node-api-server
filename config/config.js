/*
 * Configuration for the server.
*/

var config = module.exports = { };

config.port = process.env.PORT || 8080;     // port.
config.prefix = '/api';                     // route prefix.
