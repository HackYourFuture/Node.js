'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  function respond(response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ state: 'bar' }));
  }

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    switch (request.url) {
      case '/state':
        respond(response);
        break;

      case '/add':
        state = state + 1;
        break;

      case '/subtract':
        state = state - 1;
        break;

      case '/reset':
        state = state - 1;
        break;

      default:
        response.writeHead(404, { 'Content-Type': 'application.json' });
        response.end(JSON.stringify({ state: 'bar' }));
        break;
    }
  });

  return server;
}

module.exports = {
  createServer
};
