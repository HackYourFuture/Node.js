'use strict';

const http = require('http');

function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/state':
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ state }));
        break;
      case '/add':
        state++;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ state }));
        break;
      case '/subtract':
        state--;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ state }));
        break;
      case '/reset':
        state = 10;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ state }));
        break;
      default:
        response.statusCode = 404;
        const error = new Error('Not found');
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify({ error: error.message }));
        break;
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
