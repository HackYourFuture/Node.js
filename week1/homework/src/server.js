'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    response.setHeader('Content-Type', 'application/json');
    function runState(x) {
      let result = JSON.stringify({ 'state': x });
      response.write(result);
    }
    switch (request.url) {
      case '/state':
        runState(state);
        break;
      case '/add':
        state++;
        runState(state);
        break;
      case '/subtract':
        state--;
        runState(state);
        break;
      case '/reset':
        state = 10;
        runState(state);
        break;
      default:
        response.statusCode = 404;
        let result = JSON.stringify({ 'error': 'Not found' });
        response.write(result);
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
