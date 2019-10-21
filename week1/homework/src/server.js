'use strict';

const http = require('http');

function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    const serverResponseObject = {};
    response.setHeader('Content-Type', 'application/json');
    // prettier-ignore

    if (request.url === '/state') {
      serverResponseObject.state = state;
    }
    else if (request.url === '/add') {
      state++;
      serverResponseObject.state = state;
    }
    else if (request.url === '/subtract') {
      state--;
      serverResponseObject.state = state;
    }
    else if (request.url === '/reset') {
      state = 10;
      serverResponseObject.state = state;
    }
    else {
      response.statusCode = 404;
      serverResponseObject.error = 'Not found';
    }

    response.write(JSON.stringify(serverResponseObject));
    response.end();
  });

  return server;
}

module.exports = {
  createServer
};
