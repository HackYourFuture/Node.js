'use strict';

const http = require('http');
const State = require('./state');
/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  const state = new State();
  function sendState(response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(state));
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
        state.add();
        sendState(response);
        break;
      case '/subtract':
        state.subtract();
        sendState(response);
        break;
      case '/reset':
        state.reset();
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
