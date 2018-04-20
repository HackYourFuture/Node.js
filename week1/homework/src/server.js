'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    let States = (state) => {
      response.setHeader('Content-Type', 'application/json');
      const num = JSON.stringify({ state: state });
      response.write(num);
    };
    switch (request.url) {
      case '/state':
        States(state);
        break;
      case '/add':
        state++;
        States(state);
        break;
      case '/subtract':
        state--;
        States(state);
        break;
      case '/reset':
        state = 10;
        States(state);
        break;
      default:
        response.setHeader(`content-Type`, `application/json`);
        response.statusCode = 404;
        const errorMessage = { 'error': 'Not found' };
        response.write(JSON.stringify(errorMessage));
    }
     response.end();
  });
  return server;
}

module.exports = {
  createServer
};
