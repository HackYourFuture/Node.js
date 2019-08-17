'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function createServer(port) {
  let state = 10;
  function sendResponseToClient(stateX = {}, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(stateX));
  }
  function handlerRequest(req, res) {
    switch (req.url) {
      case '/state':
        sendResponseToClient({ state }, res);
        break;
      case '/add':
        state++;
        sendResponseToClient({ state }, res);
        break;
      case '/subtract':
        state--;
        sendResponseToClient({ state }, res);
        break;
      case '/reset':
        state = 10;
        sendResponseToClient({ state }, res);
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
