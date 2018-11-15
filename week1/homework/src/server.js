'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    function writeApi(state, content) {
      response.writeHead(state, { 'content-type': 'application/json' });
      response.write(JSON.stringify(content));
      response.end();
    }
    switch (request.url) {
      case '/state':
        writeApi(200, { state });
        break;

      case '/add':
        state++;
        writeApi(200, { state });
        break;

      case '/subtract':
        state--;
        writeApi(200, { state });
        break;
      case '/reset':
        state = 10;
        writeApi(200, { state });
        break;
      default:
        writeApi(404, { 'error': 'Not found' });
    }
  });
  return server;
}

module.exports = {
  createServer
};
