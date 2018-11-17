'use strict';

const http = require('http');

function createServer(port) {
  let state = 10;

  function showState(response, state) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ 'state': state }));
    response.end();
  }

  function showError(response) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ 'error': 'Not found' }));
    response.end();
  }

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        showState(response, state);
        break;
      case '/add':
        showState(response, ++state);
        break;
      case '/subtract':
        showState(response, --state);
        break;
      case '/reset':
        state = 10;
        showState(response, state);
        break;
      default:
        showError(response);
        break;
    }
  });

  return server;
}

module.exports = {
  createServer
};
