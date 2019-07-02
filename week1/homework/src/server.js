'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  function displayResponse(response, state) {
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(state));
    response.end();
  }

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        displayResponse(response, { state });
        break;

      case '/add':
        state++;
        displayResponse(response, { state });
        break;

      case '/subtract':
        state--;
        displayResponse(response, { state });
        break;

      case '/reset':
        state = 10;
        displayResponse(response, { state });
        break;

      default:
        response.statusCode = 404;
        displayResponse(response, { error: 'Not found' });
    }
  });

  return server;
}

module.exports = {
  createServer
};
