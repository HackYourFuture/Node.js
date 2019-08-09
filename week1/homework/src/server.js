'use strict';

const http = require('http');

const getResponse = (responseStatus, response, responseText) => {
  response.writeHead(responseStatus, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(responseText));
};

function createServer(port) {
  let state = 10;
  const server = http.createServer((request, response) => {
    if (request.url === '/state') getResponse(200, response, { state: state });
    else if (request.url === '/add') getResponse(200, response, { state: ++state });
    else if (request.url === '/subtract') getResponse(200, response, { state: --state });
    else if (request.url === '/reset') getResponse(200, response, { state: (state = 10) });
    else getResponse(404, response, { error: 'Not found' });
  });
  return server;
}

module.exports = {
  createServer,
};
