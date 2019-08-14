'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  // TODO: Write your homework code here
  let state = 10;
  const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });

    function responseWrite(object) {
      response.write(JSON.stringify(object));
      response.end();
    }

    switch (request.url) {
      default:
        Error('Not Found');
        break;
      case '/state':
        responseWrite(state);
        break;

      case '/add':
        responseWrite((state += 1));
        break;
      case '/subtract':
        responseWrite((state -= 1));
        break;
      case '/reset':
        responseWrite((state = 10));
        break;
    }
  });

  return server;
}

module.exports = {
  createServer
};
