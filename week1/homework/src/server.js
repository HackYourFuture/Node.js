'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    try {
      switch (request.url) {
        case '/add':
          state++;
          break;
        case '/subtract':
          state--;
          break;
        case '/reset':
          state = 10;
          break;
      }
      const stateJSON = { 'state': state };
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify(stateJSON, null, 2));
    }
    catch (err) {
      response.statusCode = 404;
      const errorJSON = { 'error': 'Not found' };
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify(errorJSON, null, 2));
    }

    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
