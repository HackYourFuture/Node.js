'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here

    function calculate(response) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ state: state}));
    };

    switch (request.url) {
      case '/state':
        calculate(response);
        break;

      case '/add':
        state = state + 1;
        calculate(response);
        break;

      case '/subtract':
        state = state - 1;
        calculate(response);
        break;

      case '/reset':
        state = 10;
        calculate(response);
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
