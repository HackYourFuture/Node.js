'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer() {
  let state = 10;
  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        response.setHeader('Content-Type', 'application/json');
        const stringifiedState = JSON.stringify({ state: state });
        response.write(stringifiedState);
        break;
      case '/add':
        response.setHeader('Content-Type', 'application/json');
        const stringifiedState2 = JSON.stringify({ state: ++state });
        response.write(stringifiedState2);
        break;
      case '/subtract':
        response.setHeader('Content-Type', 'application/json');
        const stringifiedState3 = JSON.stringify({ state: --state });
        response.write(stringifiedState3);
        break;
      case '/reset':
        response.setHeader('Content-Type', 'application/json');
        state = 10;
        const stringifiedState4 = JSON.stringify({ state });
        response.write(stringifiedState4);
        break;
      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        const error = 'Not found';
        const stringifiedError = JSON.stringify({ error });
        response.write(stringifiedError);
    }
    response.end();
  });

  return server;
}
module.exports = {
  createServer
};
