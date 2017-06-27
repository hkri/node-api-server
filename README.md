# Cheetah API Server
A simple API Server Node.js application. Deploys a server instance that will listen to HTTP requests.

## Installation

### Node
***install instructions for npm coming soon***

## Usage
1. Import the node-api-server package using `var server = require('cheetah-api-server');`.
2. Initialize the server by using `server.init();`.
3. Setup your routes after initialization. Use `server.routes.add(<route_name>, <route_path>)` function to add a new route.
4. Run the server using `server.start();`. Your Node app should now be able to accept HTTP requests.
```js
var server = require('cheetah-api-server');
server.init();
var your_api_name = server.routes.add('your_api_id', '/myapi');
//define your route ID and route path.
your_api_name.get = function(req, res) {
  // todo: process request here.
  res.json({ message: 'GET request OK.' });
}
your_api_name.post = function(req, res) {
  // todo: process request here.
  res.json({ message: 'POST request OK.' });
}
your_api_name.put = function(req, res) {
  // todo: process request here.
  res.json({ message: 'PUT request OK.' });
}
your_api_name.delete = function(req, res) {
  // todo: process request here.
  res.json({ message: 'DELETE request OK.' });
}
server.start(); // Listen to port 8080 (default)
```

## Properties

### API Server
`var server = require('cheetah-api-server');`

Function | Returns | Description
--- |
`init()` | void | Setups the server.
`start()`  | void | Sets up the routes and runs the server.
`setPort(port_number)` | void | Sets the port to use.
`setPrefix(prefix_path)` | void | Sets the prefix/root of the API.

### Routes Function
Accessible via `<server_object>.routes`.  

Function | Returns | Description
--- |
`add()` | route | Adds a new route to the server routes list.
`get()` | route | Gets the route object based on it's id.
`remove()` | void | Removes the specified route.

### Route
`var routeA = server.routes.add('your_api_id', '/myapi');`

Property | Type | Description
--- |
`id` | `string` | This serves as the id for your route  in the routes list collection.
`path` | `string` | Contains the **URL** path of your API route.  
`get = function(res, req) { }` | `function` | Contains the callback function for **GET** method.  
`put = function(res, req) { }` | `function` | Contains the callback function for the **PUT** method.  
`post = function(res, req) { }` | `function` | Contains the callback function for the **POST** method.  
`delete = function(res, req) { }` | `function` | Contains the callback function for the **DELETE** method.  

## Using Postman to test API server
To test your API, you can use any API testing tool like [Postman](https://www.getpostman.com/apps) or a browser extension/dev plugin. Using the default API settings, you can send REST methods via the API URL.

### Sending a request to the API server
1. Open Postman.
2. On the current Tab/Session, select `GET` as the HTTP method, then enter `http://localhost:8080/api` on the URL field.
3. Click the **SEND** button.
4. Your Node.js app should send a response in a JSON format.
5. Using your app, use a method to parse the received JSON data.

### Adding a parameter/param
To pass data to the API, you can use the params field. To access it, click the **Params** button on the right side of the URL bar then an input table will appear below it. Params are formatted in a key-value pair.

#### HTTP Query String
Query string is a part of URL which contains data that can be used by a server program to perform specific tasks. A URL containing a query string will look something like:
`http://yourserver.com/data?id=0f3FJ94K`

Commonly, URLs containing query strings are handled using the GET method and should be used for retrieving data from the server.

Using this demo, you can get access to a query by using  
`var value = [request_object].query.[query_id];`  

*Note: accessing a query not defined in the HTTP header/body will yield an `undefined` value.*

```js
var your_api_name = server.routes.add('your_api_id', '/myapi');
//define your route ID and route path.
your_api_name.get = function(req, res) {
  // Use the request args to get the params/query.
  var your_param_value = req.query.your_param_name;
  // todo: do the required process here.
  // Send your response to the client using the res object.
  res.json({ value: your_param_value });
}
```
#### HTTP Request Body Parameters
There are instances that data should not be exposed or accessible in the URL such as when performing data manipulation actions like creating, editing, and deleting. For these kind of actions, parameters are passed instead using the request body, in a format that the content type specifies. Parameters for `POST`, `PUT`, and `DELETE` methods are usually passed via the request body.

*Note: similar to queries, accessing a request body that is not defined will yield an `undefined` value.*

```js
api: {
  your_api_function: {
    path: "route/to/your/api",
    post: function(req, res) {
      // Use the request args to get the body.
      var your_param_value = req.body.your_param_name;  // same for put and delete methods.
      // todo: do the required process here.
      // Send your response to the client using the res object.
      res.json({ value: your_param_value });
    }
  }
}
```

## Collaborator
* [hkri](http://github.com/hkri) - **John Espiritu** &lt;[john.ioannishikari@gmail.com](mailto:john.ioannishikari@gmail.com)&gt;
