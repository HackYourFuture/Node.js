'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;
  function respond(response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ state: state }));
  }
  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        respond(response);
        break;
      case '/add':
        state++;
        respond(response);
        break;
      case '/subtract':
        state--;
        respond(response);
        break;
      case '/reset':
        state = 10;
        respond(response);
        break;
      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Not found' }));
    }
    response.end();
  });
  return server;
}

module.exports = {
  createServer
};
