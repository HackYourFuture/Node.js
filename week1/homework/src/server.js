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
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ state }));
        response.end();
        break;
      case '/reset':
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        state = 10;
        response.write(JSON.stringify({ state }));
        response.end();
        break;
      case '/add':
        response.statusCode = 200;
        while (request.url === '/add') {
          state += 1;
          break;
        }
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ state }));
        response.end();
        break;
      case '/subtract':
        response.statusCode = 200;
        while (request.url === '/subtract') {
          state -= 1;
          break;
        }
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ state }));
        response.end();
        break;
      default:
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.write(`{ "error": "Not found" }`);
        response.end();
    }
  });

  return server;
}

module.exports = {
  createServer,
};
