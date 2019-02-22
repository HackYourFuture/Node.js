'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;
  const server = http.createServer((request, response) => {
    let FinalResponse = function(status, state) {
      response.writeHead(status, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(state));
    };
    const error = 'Not found';
    switch (request.url) {
      case '/':
        FinalResponse(200, { state });
        break;
      case '/state':
        FinalResponse(200, { state });
        break;
      case '/add':
        state++;
        FinalResponse(200, { state });
        break;
      case '/subtract': state--;
        FinalResponse(200, { state });
        break;
      case '/reset': state = 10;
        FinalResponse(200, { state });
        break;
      default: FinalResponse(404, {error});
    }
  });

  return server;
}

module.exports = {
  createServer
};
