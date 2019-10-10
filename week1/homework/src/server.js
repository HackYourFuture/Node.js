'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    response.setHeader('Content-Type', 'application/json');
    if (request.url === '/reset') {
      state = 10;
      response.write(JSON.stringify({ state: state }));
    } else if (request.url === '/add') {
      response.write(JSON.stringify({ state: ++state }));
    } else if (request.url === '/subtract') {
      response.write(JSON.stringify({ state: --state }));
    } else if (request.url === '/state') {
      response.write(JSON.stringify({ state: state }));
    } else {
      response.statusCode = 404;
      response.write(JSON.stringify({ error: 'Not found' }));
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
