'use strict';

const http = require('http');
const render = require('./render');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        render(response, state);
        break;
      case '/add':
        render(response, ++state);
        break;
      case '/subtract':
        render(response, --state);
        break;
      case '/reset':
        state = 10;
        render(response, state);
        break;
      default:
        response.statusCode = 404;
        render(response, 'Not found', true);
    }

    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
