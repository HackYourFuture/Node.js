'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  function respond(response) {
    response.writeHead(200, {'Content-Type':'application/json'});
    response.write(JSON.stringify({state}));
    response.end();
  }

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    switch (request.url) {
      case '/state':
        respond(response);
        break;
      case '/add':
        state++;
        respond(response);
        break;
      case '/subtract':
        state--;
        respond(response);
        break;
      case '/reset':
        state = 10;
        respond(response);
        break;
      default:
        response.writeHead(404, {'Content-Type':'application/json'});
        response.write(response.statusCode);
        response.end();
        break;
    }
  });

  return server;
}

module.exports = {
  createServer
};
