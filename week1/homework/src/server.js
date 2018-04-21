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
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify({
        state: state
      }));
    } else if (request.url === '/add') {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify({
        state: state++
      }));
    } else if (request.url === '/subtract') {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify({
        state: state--
      }));
    } else if (request.url === '/reset') {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify({
        state: 10
      }));
    } else {
      response.writeHead(404, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify({
        'error': 'Not found'
      }));
    }
  });
  return server;
}

module.exports = {
  createServer
};