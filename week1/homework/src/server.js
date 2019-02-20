'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function displayState(response, status, data) {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(data));
  response.end();
}

function createServer(port) {
  let state = 10;
  const error = 'not found';

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    response.setHeader('Content-Type', 'application/json');
    switch (request.url) {
      case '/state':
        displayState(response, 200, { state });
        break;
      case '/add':
        state += 1;
        displayState(response, 200, { state });
        break;
      case '/subtract':
        state -= 1;
        displayState(response, 200, { state });
        break;
      case '/reset':
        state = 10;
        displayState(response, 200, { state });
        break;
      default:
        displayState(response, 200, { error });
    }
  });

  return server;
}

module.exports = {
  createServer
};
