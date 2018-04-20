'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    switch (request.url) {
      case 'state':
        response.setHeader('Content-Type', 'application/json');
        response.write(`The state is ${state}`);
        break;
      case '/add':
        response.setHeader('Content-Type', 'application/json');
        response.write(`The state is ${state + 1}`);
        break;
      case '/subtract':
        response.setHeader('Content-Type', 'application/json');
        response.write(`The state is ${state - 1}`);
        break;
      case '/reset':
        response.setHeader('Content-Type', 'application/json');
        response.write(`The state is ${state}`);
        break;
      default:
        response.statusCode = 404; // otherwise, by default is is code 200.
        break;
    }
    // never modifying state, and should return a json object - setting content type, but never actually returning a JSON thing.
    // return a JSON first, then modify.
    return response.end();
  });

  return server;
}

module.exports = {
  createServer
};
