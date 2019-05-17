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
    switch (requestUrl) {
      case '/state':
      response.statusCode = 200;
      response.setHeader('content-Type', 'application/json');
      response.end(JSON.stringify({ state }));
    break;
    case '/add':
      response.setHeader('content-Type', 'application/json');
      response.end(JSON.stringify({ state: ++state }));
    break;
    case '/subtract':
      response.setHeader('content-Type', 'application/json');
      response.end(JSON.stringify({ state: --state }));
    break;
    case '/reset':
      response.setHeader('content-Type', 'application/json');
      response.end(JSON.stringify({ state: state = 10 }));
    break
    default:
      response.statusCode = 404;
      response.setHeader('content-Type', 'application/json');
      response.end(JSON.stringify({ 'error': 'Not found' }));
    };
    
  });

  return server;
};

module.exports = {
  createServer
};
