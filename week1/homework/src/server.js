'use strict';

const http = require('http');
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        response.setHeader('Content-Type', 'application/json');
        response.write(`{"state": ${state}}`);
        break;
      case '/add':
        state++;
        response.setHeader('Content-Type', 'application/json');
        response.write(`{"state": ${state}}`);
        break;
      case '/subtract':
        state--;
        response.setHeader('Content-Type', 'application/json');
        response.write(`{"state": ${state}}`);
        break;
      case '/reset':
        state = 10;
        response.setHeader('Content-Type', 'application/json');
        response.write(`{"state": ${state}}`);
        break;
      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(`{"error": "Not found"}`);

        break;
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
