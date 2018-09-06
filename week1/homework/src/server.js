'use strict';

const http = require('http');

function createServer(port) {
  let state = { 'state': 10 };
  const pageState = '/state';
  const pageAdd = '/add';
  const pageSubtract = '/subtract';
  const pageReset = '/reset';
  const server = http.createServer((request, response) => {
    if (request.url === pageState) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(state, null, 2));
    }
    else if (request.url === pageAdd) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      state.state++;
      response.end(JSON.stringify(state, null, 2));
    }
    else if (request.url === pageSubtract) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      state.state--;
      response.end(JSON.stringify(state, null, 2));
    }
    else if (request.url === pageReset) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      state.state = 10;
      response.end(JSON.stringify(state, null, 2));
    }
    else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      const notFound = { 'error': 'Not found' };
      response.end(JSON.stringify(notFound, null, 2));
    }
  });
  return server;
}
module.exports = {
  createServer
};
