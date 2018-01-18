// To run this file: node index.js
// Then in your browser: http://localhost:8080
var http = require('http');

var port = 8080;
let status = 10;
var server = http.createServer();

// Start the HTTP server, start listening for requests
server.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('api listening on port', port);
    }
});

// Create a event handler for "request"
// this is an alternative way
server.on('request', function (request, response) {


    if (request.url === "/state") {
        response.setHeader('content-type', 'text/html');
        response.write('<html><head></head><body><h1>' + status + '</h1></body></html>');
        response.end();
    } else if (request.url === "/add") {
        status = status + 1;
        response.setHeader('content-type', 'text/html');
        response.write('<html><head></head><body><h1>' + status + '</h1></body></html>');
        response.end();

    } else if (request.url === "/remove") {
        status -= 1;
        response.setHeader('content-type', 'text/html');
        response.write('<html><head></head><body><h1>' + status + '</h1></body></html>');
        response.end();

    } else if (request.url === "/reset") {
        status = 10;
        response.setHeader('content-type', 'text/html');
        response.write('<html><head></head><body><h1>' + status + '</h1></body></html>');
        response.end();

    } else{
        status++;
        response.setHeader('content-type', 'text/html');
        response.write('<html><head></head><body><h1>' + "404 ERROR"+ '</h1></body></html>');
        response.end();

    }
});