'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  function getResponse(response, statusCode, state) {
    response.writeHead(statusCode, { 'content-type': 'application/json' });
    response.write(JSON.stringify(state));
    response.end();
  }

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    switch (request.url) {
      case '/state':
        getResponse(response, 200, { state });
        break;
      case '/add':
        state++;
        getResponse(response, 200, { state });
        break;
      case '/subtract':
        state--;
        getResponse(response, 200, { state });
        break;
      case '/reset':
        state = 10;
        getResponse(response, 200, { state });
        break;
      default:
        getResponse(response, 404, { error: 'Not found' });
    }
  });
  return server;
}

module.exports = {
  createServer: createServer,
};
