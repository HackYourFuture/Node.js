'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {

    function getResponse(state, body) {
      response.writeHead(state, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
    }

    switch (request.url) {
      case '/state':
        getResponse(200, { state });
        break;
      case '/add':
        state++;
        getResponse(200, { state });
        break;
      case '/subtract':
        state--;
        getResponse(200, { state });
        break;
      case '/reset':
        state = 10;
        getResponse(200, { state });
        break;
      default:
        getResponse(404, { 'error': 'Not found' });
    }
  });

  return server;
}

module.exports = {
  createServer
};