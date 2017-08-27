// To run this file: node index.js
// Then in your browser: http://localhost:8080
var http = require('http');

var port = 8080;

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
  response.write('<html><head></head><body><h1>Hello world</h1></body></html>');
  response.end();
});