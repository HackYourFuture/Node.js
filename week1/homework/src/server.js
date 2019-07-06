'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    switch (request.url) {
      case '/state':
        response.setHeader('content-Type', 'application/json');
        response.write(JSON.stringify({ state }));
        break;
      case '/add':
        response.setHeader('content-Type', 'application/json');
        state++;
        response.write(JSON.stringify({ state }));
        break;
      case '/subtract':
        response.setHeader('content-Type', 'application/json');
        state--;
        response.write(JSON.stringify({ state }));
        break;
      case '/reset':
        response.setHeader('content-Type', 'application/json');
        state = 10;
        response.write(JSON.stringify({ state }));
        break;
      default:
        response.statusCode = 404;
        let message = 'Not found';
        response.setHeader('content-Type', 'application/json');
        response.write(JSON.stringify({ error: message }));
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer,
};
