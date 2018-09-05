'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    const reqUrl = request.url;
    if (reqUrl === '/' || reqUrl === '/state') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      const home = {
        'state': state
      };
      response.end(JSON.stringify(home, null, 2));
    } else if (reqUrl === '/add') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      const add = {
        'state': ++state
      };
      response.end(JSON.stringify(add, null, 2));
    } else if (reqUrl === '/subtract') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      const subtract = {
        'state': --state
      };
      response.end(JSON.stringify(subtract, null, 2));
    }
    else if (reqUrl === '/reset') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      state = 10;
      const reset = {
        'state': state
      };
      response.end(JSON.stringify(reset, null, 2));
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      const notFound = {
        'error': 'Not found'
      };
      response.end(JSON.stringify(notFound, null, 2));
    }
  });

  return server;
}

module.exports = {
  createServer
};
