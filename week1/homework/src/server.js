'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  function responseStatusCode200(response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify({ state }));
  }
  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    switch (request.url) {
      case '/state':
        responseStatusCode200(response);
        break;
      case '/add':
        state += 1;
        responseStatusCode200(response);
        break;
      case '/subtract':
        state -= 1;
        responseStatusCode200(response);
        break;
      case '/reset':
        state = 10;
        responseStatusCode200(response);
        break;
      default:
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 404; // otherwise, by default is is code 200.
        response.write(JSON.stringify({ error: 'Not found' }));
        break;
    }
    // never modifying state, and should return a json object -
    // setting content type, but never actually returning a JSON thing.
    // return a JSON first, then modify.
    return response.end();
  });

  return server;
}

module.exports = {
  createServer
};
