'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  let sendResponse = (response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ state: state }));
  };

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    switch (request.url) {
      case '/state':
        sendResponse(response);
        break;

      case '/add':
        state++;
        sendResponse(response);
        break;

      case '/subtract':
        state--;
        sendResponse(response);
        break;

      case '/reset':
        state = 10;
        sendResponse(response);
        break;

      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Not found' }));
        break;
    }
  });

  return server;
}

module.exports = {
  createServer
};
