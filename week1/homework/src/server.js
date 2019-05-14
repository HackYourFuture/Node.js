'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    switch (request.url) {
      case '/state':
        response.write(JSON.stringify({ state }));
        break;
      case '/add':
        state++;
        response.write(JSON.stringify({ state }));
        break;
      case '/subtract':
        state--;
        response.write(JSON.stringify({ state }));
        break;
      case '/reset':
        state = 10;
        response.write(JSON.stringify({ state }));
        break;
      default:
        if (request.url === '' || request.url === '/') {
          response.statusCode = 302;
          response.write(JSON.stringify({ state }));
        } else {
          const error = 'Not found';
          response.writeHead(404, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify({ error }));
        }
    }
    response.end();
  });

  return server;
}

module.exports = {
  // eslint-disable-next-line comma-dangle
  createServer,
};
