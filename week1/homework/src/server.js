'use strict';

const http = require('http');
const responseHandler = require('./responseHandler');
/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        responseHandler.handleResponse(response, 200, state);
        break;
      case '/add':
        state++;
        responseHandler.handleResponse(response, 200, state);
        break;
      case '/subtract':
        state--;
        responseHandler.handleResponse(response, 200, state);
        break;
      case '/reset':
        state = 10;
        responseHandler.handleResponse(response, 200, state);
        break;
      default:
        responseHandler.handleResponse(response, 404, 'Not found');
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
