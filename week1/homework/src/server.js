'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function createServer(port) {
  let state = 10;

  function getResponse(response, state) {
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(state));
    response.end();
  }

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        getResponse(response, { state });
        break;
      case '/add':
        state++;
        getResponse(response, { state });
        break;
      case '/subtract':
        state--;
        getResponse(response, { state });
        break;
      case '/reset':
        state = 10;
        getResponse(response, { state });
        break;
      default:
        response.statusCode = 404;
        getResponse(response, { error: 'Not found' });
    }
  });

  return server;
}

module.exports = {
  createServer
};
