'use strict';

const http = require('http');
// var path = require('path');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here

    response.setHeader('Content-Type', 'application/json');

    switch (request.url) {
      case '/state':
        console.log(state);
        response.write(JSON.stringify({ state: state }));
        break;
      case '/add':
        response.write(JSON.stringify({ state: state += 1 }));
        break;
      case '/subtract':
        response.write(JSON.stringify({ state: state -= 1 }));
        break;
      case '/reset':
        state = 10;
        response.write(JSON.stringify({ state: state }));
        break;
      default:
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify('404 Not found'));
    }

    response.end();
  });

  return server;
}

createServer(3000);

module.exports = {
  createServer
};
