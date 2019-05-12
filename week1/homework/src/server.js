'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    if (request.url.startsWith('/state')) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ state: state }));
    }
 else if (request.url === '/add') {
      state = state + 1;
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ state: state }));
    }
 else if (request.url === '/subtract') {
      state = state - 1;
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ state: state }));
    }
 else if (request.url === '/reset') {
      state = 10;
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ state: state }));
    }
 else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      // obj = { error: 'Not found' };
      response.write(JSON.stringify({ error: 'Not found' }));
    }

    response.end();
  });
  return server;
}

module.exports = {
  createServer
};
