'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/add':
        response.setHeader('Content-Type', 'application/json');
        state++;
        response.end(JSON.stringify({ state: state }));
        break;
      case '/state':
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ state: state }));
        break;
      case '/subtract':
        response.setHeader('Content-Type', 'application/json');
        state--;
        response.write(JSON.stringify({ state: state }));
        break;
      case '/reset':
        response.setHeader('Content-Type', 'application/json');
        state = 10;
        response.write(JSON.stringify({ state: state }));
        break;
      default:
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 404;
        response.write(JSON.stringify({ error: 'Not found' }));
    }
    response.end();
  });
  return server;
}

module.exports = {
  createServer,
};
