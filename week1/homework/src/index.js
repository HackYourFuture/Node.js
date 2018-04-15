'use strict';
const http = require('http');

let state = 10;
const port = 8080;
const server = http.createServer(handleRequest);

function handleRequest(request, response) {
  console.log('server is requesting', request.url);

  switch (request.url) {
    case '/state':

      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1 style="background-color:blue;color:white;font-size:46px;">the current state is ${state}</h1>`);

      break;
    case '/add':
      state = state + 1;
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1 style="background-color:blue;color:white;font-size:46px;">OK  ${state}</h1>`);
      break;
    case '/subtract':
      state = state - 1;
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1 style="background-color:blue;color:white;font-size:46px;">OK  ${state}</h1>`);

      break;
    case '/rest':
      state = 10;
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1 style="background-color:blue;color:white;font-size:46px;">the state is = ${state}</h1`);
      break;
    default:
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1 style="background-color:blue;color:white;font-size:46px;">Error code 404 : 'Not found'
       <br> please try something else </h1>`);
  }
  response.end();
}

server.listen(port, () => {
  console.log('We are now listening on localhost:' + port);
});
