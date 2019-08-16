'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  // TODO: Write your homework code here
  let state = 10;
  const server = http.createServer((request, response) => {
    function responseWrite(statusCode, result = {}) {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(result));
    }

    switch (request.url) {
      default:
        responseWrite(404, { error: 'Not found' });
        break;
      case '/state':
        responseWrite(200, { state });
        break;

      case '/add':
        responseWrite(200, { state: (state += 1) });
        break;
      case '/subtract':
        responseWrite(200, { state: (state -= 1) });
        break;
      case '/reset':
        responseWrite(200, { state: (state = 10) });
        break;
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
