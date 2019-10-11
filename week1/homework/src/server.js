'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    const responseJsonObject = {};

    response.setHeader('Content-Type', 'application/json');

    function createResponse(data) {
      if (response.statusCode === 404) {
        responseJsonObject.error = data;
      } else {
        responseJsonObject.state = data;
      }
      response.write(JSON.stringify(responseJsonObject));
    }

    switch (request.url) {
      case '/state': {
        createResponse(state);
        break;
      }
      case '/add': {
        createResponse(++state);
        break;
      }
      case '/subtract': {
        createResponse(--state);
        break;
      }
      case '/reset': {
        createResponse((state = 10));
        break;
      }
      default: {
        response.statusCode = 404;
        createResponse('Not found');
        break;
      }
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer,
};
