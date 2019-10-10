'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */

function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    let serverResponse = {};

    if (request.url === '/state') {
      serverResponse.state = state;
    } else if (request.url === '/add') {
      state++;
      serverResponse.state = state;
    } else if (request.url === '/subtract') {
      state--;
      serverResponse.state = state;
    } else if (request.url === '/reset') {
      state = 10;
      serverResponse.state = state;
    } else {
      response.statusCode = 404;
      serverResponse.error = 'Not found';
    }

    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(serverResponse));
    response.end();
  });

  return server;
}

module.exports = {
  createServer,
};
