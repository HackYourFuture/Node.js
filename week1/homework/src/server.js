'use strict';

const http = require('http');
/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    function GivResponse(dataValue, state) {
      response.writeHead(dataValue, { 'content-type': 'application/json' });
      response.write(JSON.stringify(state));
      response.end();
    }
    switch (request.url) {
      case '/state':
        GivResponse(200, { 'state': state });
        break;

      case '/add':
        state++;
        GivResponse(200, { 'state': state });
        break;

      case '/subtract':
        state--;
        GivResponse(200, { 'state': state });
        break;

      case '/reset':
        state = 10;
        GivResponse(200, { 'state': state });
        break;
      default:
        GivResponse(404, { 'error': 'Not found' });
    }

  });
  return server;
}

module.exports = {
  createServer
};
