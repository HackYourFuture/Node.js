'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    let responseJsonObject = {};
    response.setHeader('Content-Type', 'application/json');
    switch (request.url) {
      case '/state': {
        responseJsonObject.state = state;
        response.write(JSON.stringify(responseJsonObject));
        break;
      }
      case '/add': {
        responseJsonObject.state = ++state;
        response.write(JSON.stringify(responseJsonObject));
        break;
      }
      case '/subtract': {
        responseJsonObject.state = --state;
        response.write(JSON.stringify(responseJsonObject));
        break;
      }
      case '/reset': {
        state = 10;
        responseJsonObject.state = state;
        response.write(JSON.stringify(responseJsonObject));
        break;
      }
      default: {
        response.statusCode = 404;
        responseJsonObject.error = 'Not found';
        response.write(JSON.stringify(responseJsonObject));
        break;
      }
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
