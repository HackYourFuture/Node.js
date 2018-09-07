'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    function changeState(response, state) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ 'state': state }));
      response.end();
    }

    // TODO: Write your homework code here
    switch (request.url) {
      case '/':
      case '/state':
        changeState(response, state);
        break;
      case '/add':
        changeState(response, ++state);
        break;
      case '/subtract':
        changeState(response, --state);
        break;
      case '/reset':
        changeState(response, state = 10);
        break;
      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ 'error': 'Not found' }));
        response.end();
    }
  });

  return server;
}

module.exports = {
  createServer
};
