'use strict';

const http = require('http');

const sendResponse = (responseStatus, response, responseObj) => {
  response.writeHead(responseStatus, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(responseObj));
};

function createServer(port) {
  let state = 10;
  const server = http.createServer((request, response) => {
    if (request.url === '/state') sendResponse(200, response, { state: state });
    else if (request.url === '/add') sendResponse(200, response, { state: ++state });
    else if (request.url === '/subtract') sendResponse(200, response, { state: --state });
    else if (request.url === '/reset') sendResponse(200, response, { state: (state = 10) });
    else sendResponse(404, response, { error: 'Not found' });
  });
  return server;
}

module.exports = {
  createServer
};
