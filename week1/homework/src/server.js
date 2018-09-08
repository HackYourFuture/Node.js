'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    if (request.url === '/state') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      const main = { 'state': state };
      response.end(JSON.stringify(main));
    }
    else if (request.url === '/add') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      const add = { 'state': ++state };
      response.end(JSON.stringify(add));
    }
    else if (request.url === '/subtract') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      const subtract = { 'state': --state };
      response.end(JSON.stringify(subtract));
    }
    else if (request.url === '/reset') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      state = 10;
      const reset = { 'state': state };
      response.end(JSON.stringify(reset));
    }
    else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      const err = { 'error': 'Not found' };
      response.end(JSON.stringify(err));
    }
  });

  return server;
}

module.exports = {
  createServer
};
