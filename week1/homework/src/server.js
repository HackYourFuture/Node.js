'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    const handleRequest = (statusCode, jsonMessage) => {
      response.writeHead(statusCode, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify(jsonMessage));
    };

    switch (request.url) {

      case '/state';
        handleRequest(response);
        break;

      case '/add';
        state++;
        handleRequest(response);
        break;

      case '/subtract';
        state--;
        handleRequest(response);
        break;

      case '/reset';
        state = 10;
        handleRequest(response);
        break;

      default:
        response.statusCode = 404;
        sendText(response, 'File not found');

    }
  });

  return server;
}

module.exports = {
  createServer
};
