'use strict';

let state = 10;

function handleRequest(request, response) {
  console.log('on request', request.url);

  switch (request.url) {
    case '/state':

      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1>the current state is ${state}</h1>`);

      break;
    case '/add':
      state = state + 1;
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1>OK  ${state}</h1>`);
      break;
    case '/subtract':
      state = state - 1;
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1>OK  ${state}</h1>`);

      break;
    case '/rest':
      state = 10;
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1>the state is = ${state}</h1`);
      break;
    default:
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1>Error code 404 : 'Not found'
       <br> please try something else </h1>`);
  }
  response.end();
}

module.exports = handleRequest;
