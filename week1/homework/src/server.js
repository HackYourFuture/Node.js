'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer() {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    if (request.url === '/' || request.url === '/state') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ state: state }));
    } else if (request.url === '/add') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      state++;
      response.end(JSON.stringify({ state: state }));
    } else if (request.url === '/subtract') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      state--;
      response.end(JSON.stringify({ state: state }));
    } else if (request.url === '/reset') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      state = 10;
      response.end(JSON.stringify({ state: state }));
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ "error": "Not found" }));
      response.end();
    }
  });

  return server;
}

module.exports = {
  createServer
};
