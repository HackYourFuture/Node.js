/* eslint-disable max-len */
'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
const sendResponse = (responseStatus, response, responseObj) => {
  response.writeHead(responseStatus, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(responseObj));
};

function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    if (request.url === '/state') {
      sendResponse(200, response, {
        state
      });
      response.end();
    }
    if (request.url === '/add') {
      state++;
      sendResponse(200, response, {
        state
      });
      response.end();
    }
    if (request.url === '/subtract') {
      state--;
      sendResponse(200, response, {
        state
      });
      response.end();
    }
    if (request.url === '/reset') {
      state = 10;
      sendResponse(200, response, {
        state
      });
      response.end();
    }
    else {
      sendResponse(404, response, { error: 'Not found' });
    }
  });

  return server;
}

module.exports = {
  createServer
};
