'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    if (request.url === '/state') {
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({ state }));
      response.end();
    } else if (request.url === '/add') {
      state += 1;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({ state }));
      response.end();
    } else if (request.url === '/subtract') {
      state -= 1;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({ state }));
      response.end();
    } else if (request.url === '/reset') {
      state = 10;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify({ state }));
      response.end();
    } else {
      response.setHeader('Content-Type', 'application/json');
      const error = 'Not found';
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ error }));
      response.end();
    }
  });

  return server;
}

module.exports = {
  createServer,
};
