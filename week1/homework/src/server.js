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
      case '/add':
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });

        response.end(JSON.stringify({
          state: ++state
        }, null, 2));
        break;
      case '/state':
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });

        response.end(JSON.stringify({
          state: state
        }, null, 2));
        break;
      case '/subtract':
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });

        response.end(JSON.stringify({
          state: --state
        }, null, 2));
        break;

      case '/reset':
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });

        response.end(JSON.stringify({
          state: (state = 10)
        }, null, 2));
        break;
      default:
        response.writeHead(404, {
          'Content-Type': 'application/json'
        });
        response.end(JSON.stringify({
          error: 'Not found'
        }, null, 2));
    }
  });

  return server;
}

module.exports = {
  createServer
};
