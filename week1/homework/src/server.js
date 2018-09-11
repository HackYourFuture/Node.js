'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    function stateStatus(status, state) {
      response.writeHead(status, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(state, null, 2));
      response.end();
    }
    // TODO: Write your homework code here
    switch (request.url) {
      case '/state':
        stateStatus(200, {'state': state});
        break;
      case '/add':
        ++state;
        stateStatus(200, {'state': state});
        break;
      case '/subtract':
        --state;
        stateStatus(200, {'state': state});
        break;
      case '/reset':
        state = 10;
        stateStatus(200, {'state': state});
        break;
      default:
        stateStatus(404, {'error': 'Not found'});
    }
  });

  return server;
}

module.exports = {
  createServer
};
