'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    function main(statusCode, state) {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(state, null, 1));
      response.end();
    }

    switch (request.url) {
      case '/state':
        main(200, { 'state': state });
        break;
      case '/add':
        state += 1;
        main(200, { 'state': state });
        break;
      case '/subtract':
        state -= 1;
        main(200, { 'state': state });
        break;
      case '/reset':
        state = 10;
        main(200, { 'state': state });
        break;
      default:
        main(404, { 'error': 'Not found' });
    }
  });

  return server;
}

module.exports = {
  createServer
};
