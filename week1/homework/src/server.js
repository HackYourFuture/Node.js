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
        serverResponse(response);
        break;
      case '/add':
        state += 1;
        serverResponse(response);
        break;
      case '/subtract':
        state -= 1;
        serverResponse(response);
        break;
      case '/reset':
        state = 10;
        serverResponse(response);
        break;
      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Not found' }));
        break;
    }
  });

  function serverResponse(response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ state: state }));
  }

  return server;
}

module.exports = {
  createServer
};
