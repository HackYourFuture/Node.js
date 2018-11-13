'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        response.writeHead(200, { 'content-type': 'application/json' });
        response.write(JSON.stringify({ state }));
        response.end();
        break;
      case '/add':
        state++
        response.writeHead(200, { 'content-type': 'application/json' });
        response.write(JSON.stringify({ state }));
        response.end();
        break;
      case '/subtract':
        state--
        response.writeHead(200, { 'content-type': 'application/json' });
        response.write(JSON.stringify({ state }));
        response.end();
        break;
      case '/reset':
        state = 10;
        response.writeHead(200, { 'content-type': 'application/json' });
        response.write(JSON.stringify({ state }));
        response.end();
        break;
      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ "error": "Not found" }));
        response.end();
    }
  });

  return server;
}

module.exports = {
  createServer
};
