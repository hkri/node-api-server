/*
  Sample Route Specification
 */

// Expose the routes and callbacks here.
module.exports = {
  /* Checks if the given member is set or not empty in both body and query. */
  hasVal: function(req, member) {
  if(req.query[member] === undefined && req.body[member] === undefined)
    return false;
    return true;
  },
  /* Get the value of the given member. */
  getVal: function(req, member) {
    if(this.isSet(req, member)) {
      return (req.query[member] !== undefined) ? req.query[member] : req.body[member];
    }
  },
  /* Define the API routes. */
  api: {
    myroute: {
      path: "/myroute",
      get: function(req, res) {
        // todo: define get codes here.
        res.json({ message: 'Route GET OK.' });
      },
      put: function(req, res) {
        // todo: define put codes here.
        res.json({ message: 'Route PUT OK.' });
      },
      post: function(req, res) {
        // todo: define post codes here.
        res.json({ message: 'Route POST OK.' });
      },
      delete: function(req, res) {
        // todo: define delete codes here.
        res.json({ message: 'Route DELETE OK.' });
      }
    }
  }
};
