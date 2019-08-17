'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function responseHandler(response, status, state) {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  if (status === 200) {
    response.write(JSON.stringify({ state }));
  }
 else {
    response.write(JSON.stringify({ error: state }));
  }
}
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        responseHandler(response, 200, state);
        break;
      case '/add':
        state++;
        responseHandler(response, 200, state);
        break;
      case '/subtract':
        state--;
        responseHandler(response, 200, state);
        break;
      case '/reset':
        state = 10;
        responseHandler(response, 200, state);
        break;
      default:
        responseHandler(response, 404, `Not found`);
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer,
  responseHandler
};
