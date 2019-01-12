'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    const requestUrl = request.url;
    if (request.url === '/state') {
      response.statusCode = 200;
      response.setHeader('content-Type', 'application/json');
      response.end(JSON.stringify({ state }));
      // console.log(JSON.stringify({ state: state + 1 }));
    }
    else
    if (request.url === '/add') {
      response.statusCode = 200;
      response.setHeader('content-Type', 'application/json');
      response.end(JSON.stringify({ state: ++state }));
    }
    else
    if (request.url === '/subtract') {
      response.statusCode = 200;
      response.setHeader('content-Type', 'application/json');
      response.end(JSON.stringify({ state: --state }));
    }
    else
    if (request.url === '/reset') {
      response.statusCode = 200;
      response.setHeader('content-Type', 'application/json');
      response.end(JSON.stringify({ state: state = 10 }));
    }
    else {
      response.statusCode = 404;
      response.setHeader('content-Type', 'application/json');
      response.end(JSON.stringify({ 'error': 'Not found' }));
    }
  });

  return server;
}

module.exports = {
  createServer
};
