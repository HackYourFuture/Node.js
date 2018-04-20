'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    console.log(request.url);
    function switchStates(x) {
      response.setHeader(`Content-Type`, `application/json`);
      let message = { 'state': x };
      response.write(JSON.stringify(message));
      response.end();
    }
    switch (request.url) {
      case '/state':
        switchStates(state);
        break;
      case '/add':
        state++;
        switchStates(state);
        break;
      case '/subtract':
        state--;
        switchStates(state);
        break;
      case '/reset':
        state = 10;
        switchStates(state);
        break;
      default:
        response.statusCode = 404;
        response.setHeader(`content-Type`, `application/json`);
        let message = { 'error': 'Not found' };
        response.write(JSON.stringify(message));
        response.end();
    }
  });

  return server;
}

module.exports = {
  createServer
};
