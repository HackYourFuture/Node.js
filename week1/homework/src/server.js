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
      case '/state':
        responseWrite(200, { state });
        break;

      case '/add':
        state += 1;
        responseWrite(200, { state: state });
        break;
      case '/subtract':
        state -= 1;
        responseWrite(200, { state: state });
        break;
      case '/reset':
        state = 10;
        responseWrite(200, { state: state });
        break;
      default:
        responseWrite(404, { error: 'Not found' });
        break;
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
