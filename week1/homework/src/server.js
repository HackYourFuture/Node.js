'use strict';

const http = require('http');
/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  function sendState(response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ state }));
  }

  function sendError(response) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Not found' }));
  }

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        sendState(response);
        break;
      case '/add':
        state++;
        sendState(response);
        break;
      case '/subtract':
        state--;
        sendState(response);
        break;
      case '/reset':
        state = 10;
        sendState(response);
        break;
      default:
        sendError(response);
        break;
    }
  });

  return server;
}

module.exports = {
  createServer
};
