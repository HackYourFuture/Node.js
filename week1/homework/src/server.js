'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    const sendRes = (status, object) => {
      response
        .writeHead(status, { 'Content-Type': 'application/json' })
        .write(JSON.stringify(object));
    };
    switch (request.url) {
      case '/state':
        sendRes(200, { state });
        break;
      case '/add':
        state++;
        sendRes(200, { state });
        break;
      case '/subtract':
        state--;
        sendRes(200, { state });
        break;
      case '/reset':
        state = 10;
        sendRes(200, { state });
        break;
      default:
        sendRes(404, { error: 'Not found' });
    }
    response.end();
  });

  return server;
}

module.exports = {
  createServer,
};
