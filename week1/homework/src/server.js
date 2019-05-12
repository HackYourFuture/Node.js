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
      response.write(JSON.stringify({ key: state }));
    } else if (request.url === '/add') {
      state = state + 1;
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ key: state }));
    } else if (request.url === '/subtract') {
      state = state - 1;
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ key: state }));
    } else if (request.url === '/reset') {
      state = 10;
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ key: state }));
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ error: 'Error' }));
    }

    response.end();
  });

  return server;
}

module.exports = {
  createServer,
};
