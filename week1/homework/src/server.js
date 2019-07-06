'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;
  function respSetHeadAndWriteState(response) {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ state: state }));
  }
  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/add':
        state++;
        respSetHeadAndWriteState(response);
        break;
      case '/state':
        respSetHeadAndWriteState(response);
        break;
      case '/subtract':
        state--;
        respSetHeadAndWriteState(response);
        break;
      case '/reset':
        state = 10;
        respSetHeadAndWriteState(response);
        break;
      default:
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ error: 'Not found' }));
    }
    response.end();
  });
  return server;
}

module.exports = {
  createServer,
};
