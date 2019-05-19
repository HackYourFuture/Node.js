'use strict';

const http = require('http');

function createServer(port) {
  let state = 10;
  const outputJson = {
    'Content-Type': 'application/json'
  };

  const server = http.createServer((request, response) => {
    if (request.url === '/state') {
      response.writeHead(200, outputJson);
      response.write(JSON.stringify({
        state
      }));
    }
 else if (request.url === '/add') {
      state = state + 1;
      response.writeHead(200, outputJson);
      response.write(JSON.stringify({
        state
      }));
    }
 else if (request.url === '/subtract') {
      state = state - 1;
      response.writeHead(200, outputJson);
      response.write(JSON.stringify({
        state
      }));
    }
 else if (request.url === '/reset') {
      state = 10;
      response.writeHead(200, outputJson);
      response.write(JSON.stringify({
        state
      }));
    }
 else {
      response.writeHead(404, outputJson);
      response.write(JSON.stringify({
        error: 'Not found'
      }));
    }

    response.end();
  });
  return server;
}

module.exports = {
  createServer
};
