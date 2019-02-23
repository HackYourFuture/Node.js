'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    const createResponse = function(status, state) {
      response.writeHead(status, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(state));
    };
    switch (request.url) {
      case '/':
        createResponse(200, { state });
        break;
      case '/state':
        createResponse(200, { state });
        break;
      case '/add':
        state++;
        createResponse(200, { state });
        break;
      case '/subtract':
        state--;
        createResponse(200, { state });
        break;
      case '/reset':
        state = 10;
        FinalResponse(200, { state });
        break;
    }
  });

  return server;
}

module.exports = {
  createServer,
};
