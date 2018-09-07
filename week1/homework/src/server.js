'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json', 'charset = utf - 8');
    switch (request.url) {
      case '/state':
        response.write(JSON.stringify({ state }));
        break;
      case '/add':
        state += 1;
        response.write(JSON.stringify({ state }));
        break;
      case '/subtract':
        state -= 1;
        response.write(JSON.stringify({ state }));
        break;
      case '/reset':
        state = 10;
        response.write(JSON.stringify({ state }));
        break;
      default:
        if (request.url === '/') {
          response.write(JSON.stringify({ state }));
        }
        else {
          response.statusCode = 404;
          const notFound = { 'error': 'Not found' };
          response.end(JSON.stringify(notFound, null, 2));
        }
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
