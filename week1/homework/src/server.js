'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    function sendResponse(status, stateValue, contentType) {
      state = stateValue;
      response.writeHead(status, { 'Content-Type': contentType });
      response.write(`{ "state": ${state}}`);
    }
    switch (request.url) {
      case '/state':
        sendResponse(200, state, 'application/json');
        break;
      case '/add':
        sendResponse(200, state + 1, 'application/json');
        break;
      case '/subtract':
        sendResponse(200, state - 1, 'application/json');
        break;
      case '/reset':
        sendResponse(200, 10, 'application/json');
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
