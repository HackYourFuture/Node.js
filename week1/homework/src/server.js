'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` 
otherwise the tests will fail.
 */
function createServer() {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    switch (request.url) {
      case '/state':
        const stateJson1 = { 'state': state };
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(stateJson1));
        break;

      case '/add':
        state++;
        const stateJson2 = { 'state': state };
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(stateJson2));
        break;

      case '/subtract':
        state--;
        const stateJson3 = { 'state': state };
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(stateJson3));
        break;

      case '/reset':
        state = 10;
        const stateJson4 = { 'state': state };
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(stateJson4));
        break;

      default:
        const errorMessage = { 'error': 'Not found' };
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(errorMessage));
    }
  });

  return server;
}

module.exports = {
  createServer
};
