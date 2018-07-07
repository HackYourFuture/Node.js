'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

let state = 10;

function sendResponse(response, status, stateValue, contentType) {
  state = stateValue;
  response.writeHead(status, { 'Content-Type': contentType });
  response.write(JSON.stringify({ state }));
}

function createServer(port) {
  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    switch (request.url) {
      case '/state':
        sendResponse(response, 200, state, 'application/json');
        break;
      case '/add':
        sendResponse(response, 200, state + 1, 'application/json');
        break;
      case '/subtract':
        sendResponse(response, 200, state - 1, 'application/json');
        break;
      case '/reset':
        sendResponse(response, 200, 10, 'application/json');
        break;
      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(`{ "error": "Not found" }`);
        break;
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
