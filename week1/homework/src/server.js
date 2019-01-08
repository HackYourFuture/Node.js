'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    function getResponse(statusCode, state) {
      response.writeHead(statusCode, { 'content-type': 'application/json' });
      response.write(JSON.stringify(state));
      response.end();
    }
    if (request.url === '/state') {
      getResponse(200, { state });
    } else if (request.url === '/add') {
      state++;
      getResponse(200, { state });
    } else if (request.url === '/subtract') {
      state--;
      getResponse(200, { state });
    } else if (request.url === '/reset') {
      state = 10;
      getResponse(200, { state });
    } else {
      getResponse(404, { error: 'Not found' });
    }
  });
  return server;
}

module.exports = {
  createServer: createServer,
};
