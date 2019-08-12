'use strict';

const http = require('http');
/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  function sendState(res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ state }));
  }

  function sendError(res) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
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
