'use strict';

const http = require('http');
const State = require('./state');
/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  const state = new State();
  const error = { error: 'Not found' };
  function sendJSON(response, status, content) {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(content));
  }

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        sendJSON(response, 200, state);
        break;
      case '/add':
        state.add();
        sendJSON(response, 200, state);
        break;
      case '/subtract':
        state.subtract();
        sendJSON(response, 200, state);
        break;
      case '/reset':
        state.reset();
        sendJSON(response, 200, state);
        break;
      default:
        sendJSON(response, 404, error);
        break;
    }
  });

  return server;
}

module.exports = {
  createServer
};
