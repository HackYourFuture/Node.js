'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    function responseOk(statusCode, write) {
      response.statusCode = statusCode;
      response.setHeader('Content-Type', 'application/json');
      response.write(write);
      response.end();
    }
    switch (request.url) {
      case '/state':
        responseOk(200, JSON.stringify({ state }));
        break;
      case '/reset':
        state = 10;
        responseOk(200, JSON.stringify({ state }));
        break;
      case '/add':
        state++;
        responseOk(200, JSON.stringify({ state }));
        break;
      case '/subtract':
        state--;
        responseOk(200, JSON.stringify({ state }));
        break;
      default:
        responseOk(404, `{ "error": "Not found" }`);
    }
  });

  return server;
}

module.exports = {
  createServer
};
