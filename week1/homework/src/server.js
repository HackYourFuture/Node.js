/* eslint-disable indent */
'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  function sendResponse(response, state) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(state));
    response.end();
  }

  function sendErrorResponse(response, state) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(state));
    response.end();
  }

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    switch (request.url) {
      case '/state':
        sendResponse(response, { state });
        break;
      case '/add':
        state++;
        sendResponse(response, { state });
        break;
      case '/subtract':
        state--;
        sendResponse(response, { state });
        break;
      case '/reset':
        state = 10;
        sendResponse(response, { state });
        break;
      default:
        sendErrorResponse(response, { error: 'Not found' });
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
