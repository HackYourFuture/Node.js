'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function  buildResponse(status, response, result) {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(result));
}

function createServer(port) {
  let state = 10;
  const server = http.createServer((request, response) => {
  // TODO: Write your homework code here
    switch (request.url) {
      case '/state':
        buildResponse(200, response, { state: state });
        break;
      case '/add':
        buildResponse(200, response, { state: ++state});
        break;
      case '/subtract':
        buildResponse(200, response, { state: --state });
        break;
      case '/reset':
        state = 10;
        buildResponse(200, response, { state: state});
        break;
      default:
        buildResponse(404, response, { error: 'Not found'});
    }
  });
  return server;
}
module.exports = {
  createServer
};
