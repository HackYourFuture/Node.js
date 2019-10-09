'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    let responseObject = {};
    switch (request.url) {
      case '/state': {
        responseObject.state = state;
        break;
      }
      case '/add': {
        responseObject.state = ++state;
        break;
      }
      case '/subtract': {
        responseObject.state = --state;
        break;
      }
      case '/reset': {
        state = 10;
        responseObject.state = state;
        break;
      }
      default: {
        response.statusCode = 404;
        responseObject.error = 'Not found';
        break;
      }
    }
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(responseObject));
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
