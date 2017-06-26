/*
  Routes Collection
 */

var api = { };                       // List of APIs.

/* Checks if the given member is set or not empty in both body and query. */
var routes = {

  hasVal: function(req, member) {
    if(req.query[member] === undefined && req.body[member] === undefined) return false;
    return true;
  },

  /* Get the value of the given member. */
  getVal: function(req, member) {
    if(this.isSet(req, member)) return (req.query[member] !== undefined) ? req.query[member] : req.body[member];
  },

  /* Add new route. */
  add: function(id, path) {
    var route = { };
    route.path = path;
    api[id] = route;
    return route;
  },

  /* Retrieve the route. */
  get: function(id) {
    return api[id];
  },

  /* Delete the specified route. */
  remove: function(id) {
    delete api[id];
  },

  /* Expose the API list */
  api: api

}

module.exports = routes;  // export the object.
