'use strict';

const http = require('http');
var path = require('path');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here

    response.writeHead(200, { 'Content-Type': 'application/json' });

    switch (request.url) {
      case '/state':
        console.log(state);
        response.write(`${{ 'state': state }}`);
        break;
      case '/add':
        response.write(`${{ 'state': state += 1 }}`);
        break;
      case '/subtract':
        response.write(`${{ 'state': state -= 1 }}`);
        break;
      case '/reset':
        state = 10;
        response.write(`${{ 'state': state }}`);
        break;
      default:
        const extension = path.extname(request.url);
        if (extension === '') {
          response.statusCode = 302;
          // response.setHeader('Location', '/');
          response.write('This is invalid path!!');
        }
    }

    response.end();

  });

  return server;
}

createServer(3000);

module.exports = {
  createServer
};
