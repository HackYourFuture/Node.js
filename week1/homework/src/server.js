'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function displayState(res, state) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ 'state': state }));
  res.end();
}
function error404(res) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ 'error': 'Not found' }));
  res.end();
}
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/':
      case '/state':
        displayState(response, state);
        break;
      case '/add':
        displayState(response, ++state);
        break;
      case '/subtract':
        displayState(response, --state);
        break;
      case '/reset':
        state = 10;
        displayState(response, state);
        break;
      default:
        error404(response);
        break;
    }
  });

  return server;
}

module.exports = {
  createServer
};
