'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    if (request.url === '/state') {
      response.write(JSON.stringify({ state }));
      response.end();
    }
 else {
      response.statusCode = 404;
      const error = response.statusCode;
      response.write(JSON.stringify({ error: 'Not found' }));
      response.end();
    }
  });

  return server;
}

module.exports = {
  createServer
};
