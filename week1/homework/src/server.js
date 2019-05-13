'use strict';

const http = require('http');
const run = require('./responses/sendValues');
/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer() {
  let state = 10;

  const allRequestesAndResposes = function(request, response) {
    switch (request.url) {
      case '/state':
        run.handleResponse(response, 200, state);
        break;
      case '/add':
        state = state + 1;
        run.handleResponse(response, 200, state);
        break;
      case '/subtract':
        state = state - 1;
        run.handleResponse(response, 200, state);
        break;
      case '/reset':
        state = 10;
        run.handleResponse(response, 200, state);
        break;
      default:
        run.handleResponse(response, 404, 'Not found');
    }
    response.end();
  };
  const server = http.createServer(allRequestesAndResposes);

  return server;
}

module.exports = {
  createServer,
};
