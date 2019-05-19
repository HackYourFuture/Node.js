'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    if (request.url === '/state') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      const stateJSON = JSON.stringify({ state });
      response.write(stateJSON);
    }
 else if (request.url === '/add') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      const stateJSON = JSON.stringify({ state: ++state });
      response.write(stateJSON);
    }
 else if (request.url === '/subtract') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      const stateJSON = JSON.stringify({ state: --state });
      response.write(stateJSON);
    }
 else if (request.url === '/reset') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      state = 10;
      const stateJSON = JSON.stringify({ state });
      response.write(stateJSON);
    }
 else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      const error = 'Not found';
      const err = JSON.stringify({ error });
      response.write(err);
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
