'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function sendResponse(serverResponse, stateValue) {
  serverResponse.writeHead(200, { 'Content-Type': 'application/json' });
  serverResponse.write(JSON.stringify({ state: stateValue }));
  serverResponse.end();
}

function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here

    switch (request.url) {
      case '/state':
        sendResponse(response, state);
        break;

      case '/add':
        state += 1;
        sendResponse(response, state);
        break;

      case '/subtract':
        state -= 1;
        sendResponse(response, state);
        break;

      case '/reset':
        state = 10;
        sendResponse(response, state);
        break;

      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ error: 'Not found' }));
        response.end();
    }
  });

  return server;
}

module.exports = {
  createServer
};
