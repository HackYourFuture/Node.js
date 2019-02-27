'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;
  const server = http.createServer((request, response) => {
    const finalResponse = (status, state) => {
      response.writeHead(status, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(state));
    };
    const error = 'Not found';
    switch (request.url) {
      case '/':
        finalResponse(200, { state });
        break;
      case '/state':
        finalResponse(200, { state });
        break;
      case '/add':
        state++;
        finalResponse(200, { state });
        break;
      case '/subtract': state--;
        finalResponse(200, { state });
        break;
      case '/reset': state = 10;
        finalResponse(200, { state });
        break;
      default: finalResponse(404, {error});
    }
  });

  return server;
}

module.exports = {
  createServer
};
