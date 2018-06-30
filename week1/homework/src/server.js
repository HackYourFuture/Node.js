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
        serverResponse(response, state);
        break;
      case '/add':
        state += 1;
        serverResponse(response, state);
        break;
      case '/subtract':
        state -= 1;
        serverResponse(response, state);
        break;
      case '/reset':
        state = 10;
        serverResponse(response, state);
        break;
      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Not found' }));
        break;
    }
  });

  return server;
}

function serverResponse(response, state) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ state: state }));
}

module.exports = {
  createServer
};
