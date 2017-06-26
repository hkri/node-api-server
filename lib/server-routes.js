/*
  Routes Collection
 */
var routes = module.exports = { };  // Export the module.
var api = {};                       // List of APIs.

/* Checks if the given member is set or not empty in both body and query. */
routes.hasVal = function(req, member) {
  if(req.query[member] === undefined && req.body[member] === undefined) return false;
  return true;
}

/* Get the value of the given member. */
routes.getVal = function(req, member) {
  if(this.isSet(req, member)) return (req.query[member] !== undefined) ? req.query[member] : req.body[member];
}

/* Add new route. */
routes.add = function(id, path) {
  api[id].path = path;
  return api[id];
}

/* Retrieve the route. */
routes.get = function(id) {
  return api[id];
}

/* Delete the specified route. */
routes.remove = function(id) {
  delete api[id];
}
