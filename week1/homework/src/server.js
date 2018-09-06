'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    function sendResponse(status, body) {
      response.writeHead(status, {'Content-Type': 'application/json'});
      response.write(JSON.stringify(body));
      response.end();
    }
    switch (request.url) {
      case '/state':
        sendResponse(200, { state });
        console.log('route /state', state);
        break;
      case '/add':
        state++;
        sendResponse(200, { state });
        console.log('route /add', state);
        break;
      case '/subtract':
        state--;
        sendResponse(200, { state });
        console.log('route /subtract', state);
        break;
      case '/reset':
        state = 10;
        sendResponse(200, { state });
        console.log('route /reset', state);
        break;
      default:
        sendResponse(404, { 'error': 'Not found'});
    }
  });

  return server;
}

module.exports = {
  createServer
};
