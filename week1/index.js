// To run this file: node index.js
// Then in your browser: http://localhost:8080
var http = require('http');

var port = 8080;

var state = 10;
var server = http.createServer();

// Start the HTTP server, start listening for requests
server.listen(port, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('api listening on port', port);
  }
});

// Create a event handler for "request"
// this is an alternative way
server.on('request', function(request, response) {
  console.log('New http request received', request.url);
  response.setHeader('content-type', 'text/html');
  if (request.url == "/" || request.url == "/state"){
  	response.write('Current state is: ' + state );
  	} else if (request.url == "/add"){
  			state += 1;
  			response.write('1 is added : current state is: ' +  state );
  	} else if (request.url == "/remove"){
  			state -= 1;
  			response.write('1 is removed, current state is: ' + state );
  	} else if (request.url == "/reset"){
  			state = 10;
  			response.write('state is reset: current state is: ' + state );
 	} else {
  			response.statusCode = 404;
  			response.write('Page not found' );
  	}
  
  
  response.write('<html><head></head><body><h1>Hello world</h1></body></html>');
  response.end();
});