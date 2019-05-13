'use strict';

const http = require('http');
const sendValues = require('./responses/sendValues');
/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer() {
  let state = 10;

  const process = function(request, response) {
    switch (request.url) {
      case '/state':
        sendValues(response, 200, state);
        break;
      case '/add':
        state = state + 1;
        sendValues(response, 200, state);
        break;
      case '/subtract':
        state = state - 1;
        sendValues(response, 200, state);
        break;
      case '/reset':
        state = 10;
        sendValues(response, 200, state);
        break;
      default:
        sendValues(response, 404, 'Not found');
    }
    response.end();
  };
  const server = http.createServer(process);

  return server;
}

module.exports = {
  createServer,
};
