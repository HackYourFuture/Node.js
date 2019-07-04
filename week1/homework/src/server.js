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
      response.end(JSON.stringify({ state: state }));
    }
    if (request.url === '/add') {
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ state: ++state }));
    }
    if (request.url === '/subtract') {
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ state: --state }));
    }
    if (request.url === '/reset') {
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ state: state }));
    }
    // eslint-disable-next-line indent
    else {
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = 404;
      response.end(JSON.stringify({ error: 'Not found' }));
    }
    response.end();
    // TODO: Write your homework code here
  });

  return server;
}

module.exports = {
  createServer
};
