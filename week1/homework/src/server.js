'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function createServer(port) {
  let state = 10;

  // Created a function in order to not repeating myself.
  function showResponse(response) {
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify({ state }));
    response.end();
  }

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        showResponse(response);
        break;
      case '/add':
        state++;
        showResponse(response);
        break;
      case '/subtract':
        state--;
        showResponse(response);
        break;
      case '/reset':
        state = 10;
        showResponse(response);
        break;
      default:
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ error: 'Not found' }));
        response.end();
    }
  });

  return server;
}

module.exports = {
  createServer
};
