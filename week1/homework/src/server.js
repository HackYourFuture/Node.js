'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    function sendResponse(statusNum, content) {
      response.statusCode = statusNum;
      response.setHeader('content-type', 'text/plain');
      statusNum === 200
        ? response.write(JSON.stringify({ state: content }))
        : response.write(JSON.stringify({ 404: 'not found' }));
      response.end();
    }
    switch (request.url) {
      case '/':
        sendResponse(200, state);
        break;
      case '/add':
        sendResponse(200, ++state);
        break;
      case '/subtract':
        sendResponse(200, --state);
        break;
      case '/reset':
        sendResponse(200, (state = 10));
        break;
      default:
        sendResponse(404, `not found`);
    }
  });
  return server;
}

module.exports = {
  createServer,
};
