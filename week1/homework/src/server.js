'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function handleRequest(response, state) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify({ state }));
}
function handleError(response) {
  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify({ error: 'Nothing here!' }));
}

function createServer(port) {
  let state = 10;
  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        handleRequest(response, state);
        break;
      case '/add':
        state++;
        handleRequest(response, state);
        break;
      case '/subtract':
        state--;
        handleRequest(response, state);
        break;
      case '/reset':
        state = 10;
        handleRequest(response, state);
        break;
      default:
        handleError(response);
    }
    response.end();
  });
  return server;
}

module.exports = {
  createServer
};
