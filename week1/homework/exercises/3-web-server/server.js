/**
 * Exercise 3: Create an HTTP web server
 */

var http = require('http');

//create a server
let server = http.createServer(function (req, res) {
  // YOUR CODE GOES IN HERE
	res.write('Hello World!'); // Sends a response back to the client
	res.end(); // Ends the response
});

server.listen(3000); // The server starts to listen on port 3000