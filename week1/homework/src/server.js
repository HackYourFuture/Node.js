'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here

    switch (request.url) {
      case '/':
        sendResponse(200, `this is ${state}`, response);
        break;
      case '/add':
        sendResponse(200, `the state now is ${++state}`, response);
        break;
      case '/subtract':
        sendResponse(200, `the state now is ${--state}`, response);
        break;
      case '/reset':
        sendResponse(200, `the state return to ${(state = 10)}`, response);
        break;
      default:
        sendResponse(404, `not found`, response);
    }
  });
  return server;
}
function sendResponse(statusNum, content, response) {
  response.statusCode = statusNum;
  response.setHeader('content-type', 'application/json');
  response.write(content);
  let myObj = {
    content
  };
  response.end(JSON.stringify(myObj));
}

module.exports = {
  createServer
};
