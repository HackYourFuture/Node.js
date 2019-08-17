'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    function writeResponse(statusCode, responseObject) {
      response.writeHead(statusCode, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify(responseObject));
    }
    switch (request.url) {
      case '/add':
        writeResponse(200, { state: ++state });
        break;
      case '/state':
        writeResponse(200, { state: state });
        break;
      case '/subtract':
        writeResponse(200, { state: --state });
        break;

      case '/reset':
        writeResponse(200, { state: (state = 10) });
        break;
      default:
        writeResponse(404, { error: 'Not found' });
    }
  });

  return server;
}

module.exports = {
  createServer
};
