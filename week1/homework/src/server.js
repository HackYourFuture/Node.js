'use strict';

const url = require('url');
const http = require('http');
// const fs = require('fs');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;
  let newState = state;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    const requestedUrl = url.parse(request.url, true);

    if (requestedUrl.pathname === '/state') {
      response.writeHead(200, { 'Content-type': 'application/json' });
      response.end(JSON.stringify({ state: newState }));
    } else if (requestedUrl.pathname === '/add') {
      response.writeHead(200, { 'Content-type': 'application/json' });
      newState = newState + 1;
      response.end(JSON.stringify({ state: newState }));
    } else if (requestedUrl.pathname === '/subtract') {
      response.writeHead(200, { 'Content-type': 'application/json' });
      newState = newState - 1;
      response.end(JSON.stringify({ state: newState }));
    } else if (requestedUrl.pathname === '/reset') {
      response.writeHead(200, { 'Content-type': 'application/json' });
      newState = state;
      response.end(JSON.stringify({ state: newState }));
    } else {
      response.writeHead(404, { 'Content-type': 'application/json' });
      response.end(JSON.stringify({ error: 'Not found' }));
    }
  });
  return server;
}

module.exports = {
  createServer
};
