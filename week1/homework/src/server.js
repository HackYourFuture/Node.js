'use strict';

const http = require('http');
const sendResponse = (responseStatus, response, responseObj) => {
  response.writeHead(responseStatus, {
    'Content-Type': 'application/json'
  });
  response.end(JSON.stringify(responseObj));
};
function createServer(port) {
  let state = 10;
  const server = http.createServer((request, response) => {
    switch (request.url) {
      case `/state`:
        sendResponse(200, response, {
          state
        });
        break;
      case `/add`:
        state++;
        sendResponse(200, response, {
          state
        });
        break;
      case `/subtract`:
        state--;
        sendResponse(200, response, {
          state
        });
        break;
      case `/reset`:
        state = 10;
        sendResponse(200, response, {
          state
        });
        break;
      default:
        sendResponse(404, response, { error: 'Not found' });
        break;
    }

    // Finish writing my code.
  });

  return server;
}

module.exports = {
  createServer
};
