/* eslint-disable indent */
'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;
  const results = { 'Contest-Type': 'application/json' };

  const server = http.createServer((request, response) => {
    if (request.url === '/state') {
      response.writeHead(200, results);
      response.write(JSON.stringify({ state: state }));
    }
 else if (request.url === '/add') {
      response.writeHead(200, results);
      response.write(JSON.stringify({ state: state + 1 }));
    }
 else if (request.url === '/subtract') {
      response.writeHead(200, results);
      response.write(JSON.stringify({ state: state - 1 }));
    }
 else if (request.url === '/reset') {
      response.writeHead(200, results);
      response.write(JSON.stringify({ state: state }));
    }
 else {
      response.writeHead(404, results);
      response.write(JSON.stringify({ error: 'not found' }));
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
