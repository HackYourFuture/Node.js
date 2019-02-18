'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function writeInfo(response, statusCode, state) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(state));
  response.end();
}

function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/':
        writeInfo(response, 200, { state });
        break;
      case '/state':
        writeInfo(response, 200, { state });
        break;
      case '/add':
        state += 1;
        writeInfo(response, 200, { state });
        break;
      case '/subtract':
        state -= 1;
        writeInfo(response, 200, { state });
        break;
      case '/reset':
        state = 10;
        writeInfo(response, 200, { state });
        break;
      default:
        writeInfo(response, 404, { error: 'Not found' });
    }
  });
  return server;
}

module.exports = {
  createServer
};
