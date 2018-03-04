'use strict';

const http = require('http');

// state number
let state = 10;

// add and subtract function
function add() {
  state += 1;
}

function subtract() {
  state -= 1;
}
// switch function to call add subtract ..
function dataRequest(request, response) {
  switch (request.url) {
    case '/':
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1>${state}</h1>`);
      break;
    case '/state':
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1>${state}</h1>`);
      break;
    case '/add':
      response.setHeader('Content-Type', 'text/html');
      add();
      response.write('<h1>OK</h1>');
      response.write(`<h1>${state}</h1>`);
      break;
    case '/subtract':
      response.setHeader('Content-Type', 'text/html');
      subtract();
      response.write('<h1>OK</h1>');
      response.write(`<h1>${state}</h1>`);
      break;
    case '/reset':
      response.setHeader('Content-Type', 'text/html');
      const resetState = 10;
      state = resetState;
      response.write('<h1>OK</h1>');
      response.write(`<h1>${state}</h1>`);
      break;
    // for bad url
    default:
      if (request.url !== '/' || 'state' || 'reset' || 'add' || 'subtract') {
        response.statusCode = 404;
        response.write('<h1>Ops!NOT FOUND<h1>');
      }
  }
  response.end();
}
// server created
const server = http.createServer(dataRequest);

server.listen(8080, () => {
  console.log('Server listening on http://localhost:8080');
});
