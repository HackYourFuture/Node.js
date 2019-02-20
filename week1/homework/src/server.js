'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    function DisplayResponse(statusCode, write) {
      response.statusCode = statusCode;
      response.setHeader('Content-Type', 'application/json');
      response.write(write);
      response.end();
    }
    switch (request.url) {
      case '/state':
        DisplayResponse(200, JSON.stringify({ state }));
        break;
      case '/reset':
        state = 10;
        DisplayResponse(200, JSON.stringify({ state }));
        break;
      case '/add':
        state++;
        DisplayResponse(200, JSON.stringify({ state }));
        break;
      case '/subtract':
        state--;
        DisplayResponse(200, JSON.stringify({ state }));
        break;
      default:
        DisplayResponse(404, `{ "error": "Not found" }`);
    }
  });

  return server;
}

module.exports = {
  createServer
};
