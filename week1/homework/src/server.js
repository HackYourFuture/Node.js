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
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ state: state }));
        break;

      case '/add':
        state += 1;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ state: state }));

        break;
      case '/subtract':
        state -= 1;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ state: state }));

        break;
      case '/reset':
        state = 10;
        response.setHeader('Content-Type', 'application/json');
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
