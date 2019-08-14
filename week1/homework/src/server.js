'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  function changeState(response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ state }));
  }

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        changeState(response);
        break;
      case '/add':
        state += 1;
        changeState(response);
        break;
      case '/subtract':
        state -= 1;
        changeState(response);
        break;
      case '/reset':
        state = 10;
        changeState(response);
        break;
      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Not found' }));
        break;
    }
  });

  return server;
}

module.exports = {
  createServer
};
