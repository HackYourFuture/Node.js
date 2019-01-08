'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function sendResponse(response, state, statuscode) {
  response.statusCode = statuscode;
  response.setHeader('Content-type', 'application/json');
  response.write(state.toString());
  response.end();
}

function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/':
        sendResponse(response, 'Home', 200);
        break;
      case '/state':
        sendResponse(response, state, 200);
        break;
      case '/add':
        state++;
        sendResponse(response, state, 200);
        break;
      case '/subtract':
        state--;
        sendResponse(response, state, 200);
        break;
      case '/reset':
        state = 10;
        sendResponse(response, state, 200);
        break;
      default:
        sendResponse(response, '404, Not Found ', 404);
        break;
    }
  });
  return server;
}
module.exports = {
  createServer
};