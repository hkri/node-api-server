# Node API Server
A sample API Server using Node.js and Express.

### Requirements
* Node.js runtime
* Your favorite text editor
* A terminal

### How to use
1. Clone/download this repository to your local disk.
2. Using a terminal, navigate to the project root then install the node package dependencies using `npm install`.
3. Define your API routes in the `config/server-routes.js` file under the `api` key. Your entry should have a unique key/name for the route (e.i. the object the route manipulates). Under it, the following should be defined as a key-value pair:

 `path` - contains the **URL** path of your API route.  
 `get: function(res, req) { }` - contains the callback function for **GET** method.  
 `put: function(res, req) { }` - contains the callback function for the **PUT** method.  
 `post: function(res, req) { }` - contains the callback function for the **POST** method.  
 `delete: function(res, req) { }` - contains the callback function for the **DELETE** method.  

 **Example:**
 *config/server-routes.js*
 ```js
 ...
 api: {
   users: {
     path: "/users",
     get: function(req, res) {
       // todo: add a function to get users by id here.
       var data = getUsers(req.query.id);
       res.json({ message: 'Success.', data });
     },
     put: function(req, res) {
       // todo: update the user data by the given id.
       var id   = req.body.id;
       var data = res.body.data;
       var ok   = doDataUpdate(id, data);
       if (ok)  res.json({ message: 'Success' });
       else     res.json({ message: 'Failed.' });
     },
     post: function(req, res) {
       // todo: do insert user data here.
       var nid  = generateId();
       var data = req.body.data;
       var ok   = createNewUser(nid, data);
       if (ok)  res.json({ message: 'Success' });
       else     res.json({ message: 'Failed.' });
     },
     delete: function(req, res) {
       // todo: do remove user here.
       var id = req.body.id;
       var ok = deleteUser(id);
       if (ok)  res.json({ message: 'Success' });
       else     res.json({ message: 'Failed.' });
     }
   }
 }
 ```
4. Make sure to call `res.json({ key: response });` after every HTTP method call to pass or relay data to the client/user.
5. Write your API prefix path. By default, the prefix is set to `/api` which you can access via http://yourhostname/api. You can change it on the config file `config/config.js`.
6. Using a terminal, navigate to the project's root then run the server by calling `node server`.
7. Express will listen to the port defined on your `config/config.js` file. By default, it is set to port `8080`.
8. Use any tool (e.g. Postman) to test the transmission of data to/from your API.  

### Testing the API using Postman
To test your API, you can use any API testing tool like [Postman](https://www.getpostman.com/apps) or a browser extension/dev plugin. Using the default API settings, you can send REST methods via the API URL.

#### Sending a request to the API server
1. Open Postman.
2. On the current Tab/Session, select `GET` as the HTTP method, then enter `http://localhost:8080/api` on the URL field.
3. Click the **SEND** button.
4. The server should return the following results:
```json
{
    "message": "All systems operational."
}
```
5. Using your app, use a method to parse the received JSON data.

#### Adding a parameter/param
To pass data to the API, you can use the params field. To access it, click the **Params** button on the right side of the URL bar then an input table will appear below it. Params are formatted in a key-value pair.

##### HTTP Query String
Query string is a part of URL which contains data that can be used by a server program to perform specific tasks. A URL containing a query string will look something like:
`http://yourserver.com/data?id=0f3FJ94K`

Commonly, URLs containing query strings are handled using the GET method and should be used for retrieving data from the server.

Using this demo, you can get access to a query by using  
`var value = [request_object].query.[query_id];`  

*Note: accessing a query not defined in the HTTP header/body will yield an `undefined` value.*

```js
api: {
  your_api_function: {
    path: "route/to/your/api",
    get: function(req, res) {
      // Use the request args to get the params/query.
      var your_param_value = req.query.your_param_name;
      // todo: do the required process here.
      // Send your response to the client using the res object.
      res.json({ value: your_param_value });
    }
  }
}
```
##### HTTP Request Body Parameters
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

### Collaborator
* [hkri](http://github.com/hkri) - **John Espiritu** &lt;[john.ioannishikari@gmail.com](mailto:john.ioannishikari@gmail.com)&gt;
