'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function createServer(port) {
  let state = 10;
  function handleRequest(response, fileType) {
    response.writeHead(200, { 'Content-Type': fileType });
    response.write(JSON.stringify({ state }));
  }

  function handleError(response, fileType) {
    response.writeHead(404, { 'Content-Type': fileType });
    response.write(JSON.stringify({ error: 'Not found' }));
  }

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        handleRequest(response, 'application/json');
        break;
      case '/add':
        state++;
        handleRequest(response, 'application/json');
        break;
      case '/subtract':
        state--;
        handleRequest(response, 'application/json');
        break;
      case '/reset':
        state = 10;
        handleRequest(response, 'application/json');
        break;
      default:
        handleError(response, 'application/json');
        break;
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
