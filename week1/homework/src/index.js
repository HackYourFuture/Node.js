'use strict';

const http = require('http');

let state = 10;
const PORT = 8080;
const stateUrl = 'http://localhost:8080/state';

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server started at: ${stateUrl}`);
});

function handleRequest(request, response) {
  console.log('on request', request.url);
  switch (request.url) {
    case '/':
      response.setHeader('Content-Type', 'text/html');
      response.write('<h1>Main Page</h1>');
      break;
    case '/state':
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1>Current state of the application is: ${state}</h1>`);
      break;
    case '/add':
      response.setHeader('Content-Type', 'text/html');
      state++;
      response.write(`<h1>1 is added to the current state: ${state}</h1>`);
      break;
    case '/subtract':
      response.setHeader('Content-Type', 'text/html');
      state--;
      response.write(`<h1>1 is subtracted from the current state: ${state}</h1>`);
      break;
    case '/reset':
      response.setHeader('Content-Type', 'text/html');
      state = 10;
      response.write(`<h1>Current state of the application is reseted: ${state}</h1>`);
      break;
    default:
      response.setHeader('Content-Type', 'text/html');
      response.statusCode = 404; 
      response.write('<h1>Error 404 "Page not found"</h1>');
  }
  response.end();
}
