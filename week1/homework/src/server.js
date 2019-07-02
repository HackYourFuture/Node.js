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
      case '/state':
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ state: state }));
        break;
      case '/add':
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ state: (state += 1) }));
        break;
      case '/subtract':
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ state: (state -= 1) }));
        break;
      case '/reset':
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ state: (state = 10) }));
        break;
      default:
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ error: 'Not found' }));
    }
  });

  return server;
}

module.exports = {
  createServer
};
