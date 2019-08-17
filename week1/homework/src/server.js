'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function createServer(port) {
  let state = 10;
  function sendResponseToClient(statusCode, res) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ state }));
  }
  function handlerRequest(req, res) {
    switch (req.url) {
      case '/subtract':
        state--;
        sendResponseToClient(200, res);
        break;
      case '/reset':
      case '/state':
        state = 10;
        sendResponseToClient(200, res);
        break;
      case '/add':
        state++;
        sendResponseToClient(200, res);
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
        break;
    }
  }
  const server = http.createServer(handlerRequest);

  return server;
}

module.exports = {
  createServer
};
