var http = require('http');

var port = 8080;
var host = '0.0.0.0';

var server = http.createServer();

// Start the HTTP server, start listening for requests
server.listen(port, host, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('api listening on port', port);
  }
});

// Create a event handler for "request"
server.on('request', function(request, response) {
	console.log('New http request received', request.url);
	response.write('<html><head></head><body><h1>Hello world</h1></body></html>');
	response.end();
});

