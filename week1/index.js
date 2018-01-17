// To run this file: node index.js
'use strict';
// Then in your browser: http://localhost:8080
var http = require('http');

var port = 8080;

let state = 10;

var server = http.createServer((request, response) => {
    console.log(request.method, request.url);
    //console.log(response);
});

// Start the HTTP server, start listening for requests
server.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('api listening on port', port);
    }
});

// Create a event handler for "request"
// this is an alternative way
server.on('request', (request, response) => {
    console.log('New http request received', request.url);
    if (request.url === '/state') {
        response.setHeader('content-type', 'text/html');
        response.write('<h1>' + state + '</h1>');
    } else if (request.url === "/add") {
        state++;
        response.setHeader('content-type', 'text/html');
        response.write('<h1>' + state + '</h1>');
    } else if (request.url === "/remove") {
        state--;
        response.setHeader('content-type', 'text/html');
        response.write('<h1>' + state + '</h1><');
    } else if (request.url === "/reset") {
        state = 10;
        response.setHeader('content-type', 'text/html');
        response.write('><h1>' + state + '</h1>');
    } else {
        response.setHeader('content-type', 'text/html');
        response.write('<h1>' + 'error code' + response.state + ': Not found kindly check the URL' + '</h1>');
    }

    response.end();
});