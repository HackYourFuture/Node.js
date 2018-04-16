'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here

    switch (request.url) {
      case '/state':
        state = 10;
        let number = JSON.stringify({
          state: state
        });
        response.setHeader('Content-Type', 'application/json');
        response.write(`${number}`);
        break;

      case '/add':
        let add = JSON.stringify({
          state: ++state
        });
        response.setHeader('Content-Type', 'application/json');
        response.write(`${add}`);
        break;

      case '/subtract':
        let subtract = JSON.stringify({
          state: --state
        });
        response.setHeader('Content-Type', 'application/json');
        response.write(`${subtract}`);
        break;

      case '/reset':
        state = 10;
        let reset = JSON.stringify({
          state: state
        });
        response.setHeader('Content-Type', 'application/json');
        response.write(`${reset}`);
        break;

      default:
        let error = JSON.stringify({
          error: 'Not found'
        });
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 404;
        response.write(`${error}`);
        break;
    }

    response.end();
  });
  return server;
}
module.exports = {
  createServer
};
